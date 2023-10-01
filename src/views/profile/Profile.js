import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

// reactstrap components
import { 
  Button, 
  Card,
  CardBody, 
  Container, 
  Row, 
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  CardHeader,
  Form,
  FormGroup,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

import api from "../../service/api"
import { getValue } from "../../service/storage"

export default function Profile () {
  const [modal, setModals] = useState({});
  const [modalProduct, setModalProduct] = useState(null);
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [block, setBlock] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();

  const toggleModal = (state, product) => {
    setModalProduct(product)
    setModals({
      [state]: !modal[state],
    });
  };

  const getData = async () => {
    try {
      const user = getValue()

      const result = await api.get(`user/private/self/profile`, {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      setUser(result.data);  
      getRequests(result.data.id);

      setName(result.data.name)
      setAddress(result.data.address)
      setBlock(result.data.block)
      setCity(result.data.city)
      setState(result.data.state)
      setZipCode(result.data.zip_code)
    } catch (err) {
    }
  }

  const getRequests = async (id) => {
    try {
      const user = getValue()

      let route = `shop/private/request/profile/search/${id}`

      if (status !== "") {
        route = route + `?status=${status}`
      }
      const result = await api.get(route, {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      setRequests(result.data)
    } catch (err) {
    }
  }

  const updateProfile = async () => {
    try {
      const userLogin = getValue()

      await api.put(`user/private/profile/${user.id}`, 
      {
        name: name,
        address: address,
        block: block,
        city: city,
        state: state,
        zip_code: zipCode,
      },
      {
        headers: {
          "Authorization": `Bearer ${userLogin.JWT}`
        }
      });

      navigate(0)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user !== {} && user.id !== undefined) {
      getRequests(user.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <DemoNavbar signout />
      <main className="profile-page">
        <section className="section section-lg section-shaped pb-300">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-white"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="section">
          <Container>
            {user ? (
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col lg="12">
                      <div className="text-center mt-5">
                        <h3>
                          {user.name}
                        </h3>
                        <div className="h6 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          {user.address}
                        </div>
                        <div className="h6 mt-4">
                          <i className="ni business_briefcase-24 mr-2" />
                          {user.block}, {user.city} - {user.state}
                        </div>
                        <div>
                          <i className="ni education_hat mr-2" />
                          {user.zip_code}
                        </div>
                        <div className="py-4 mt-lg-0">
                          <Button
                            color="default"
                            href="#pablo"
                            onClick={() => toggleModal("formUpdate")}
                            size="sm"
                          >
                            <span className="btn-inner--icon mr-1">
                              <i className="fa fa-pencil" />
                            </span>
                            Editar
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <div className="text-center mt-5">
                          <h2>
                            Meus Pedidos
                          </h2>
                        </div>
                        <Row className="wrapper mt-4 justify-content-center">
                          <Col lg="3" sm="12">
                            <Button
                              className="btn-white btn-icon mt-2"
                              color="default"
                              onClick={() => setStatus("preparing")}
                            >
                              <span className="btn-inner--icon mr-1">
                                <i className="fa fa-refresh" />
                              </span>
                              Preparando
                            </Button>
                          </Col>
                          <Col lg="3" sm="12">
                            <Button
                              className="btn-icon mt-2"
                              color="primary"
                              onClick={() => setStatus("sent")}
                            >
                              <span className="btn-inner--icon mr-1">
                                <i className="fa fa-truck" />
                              </span>
                              Enviado
                            </Button>
                          </Col>
                          <Col lg="3" sm="12">
                            <Button
                              className="btn-icon mt-2"
                              color="info"
                              onClick={() => setStatus("received")}
                            >
                              <span className="btn-inner--icon mr-1">
                                <i className="fa fa-check" />
                              </span>
                              Entregue
                            </Button>
                          </Col>
                        </Row>
                        <div className="mt-5">
                          {requests.map((r) => r.product ? 
                            (
                              <Card className="shadow border-0 mt-2">
                                <CardBody className="py-3">
                                  <Row>
                                    <Col lg="4">
                                      <img
                                        alt="..."
                                        className="img-center img-fluid shadow shadow-lg--hover"
                                        src={r.product?.images[0].image_path}
                                        style={{ width: "100px" }}
                                      />
                                    </Col>
                                    <Col lg="8">
                                      <h6 className="text-primary text-uppercase">
                                        {r.product?.name}
                                      </h6>
                                      <p className="description mt-3">
                                        {r.product?.description}
                                      </p>
                                      {
                                        r.status === "preparing" ? (
                                          <Button
                                            className="btn-white btn-icon"
                                            color="default"
                                            onClick={() => toggleModal("modalPreparing", r)}
                                          >
                                            <span className="btn-inner--icon mr-1">
                                              <i className="fa fa-refresh" />
                                            </span>
                                            Preparando
                                          </Button>
                                        ) : r.status === "sent" ? (
                                          <Button
                                            className="btn-icon"
                                            color="primary"
                                            onClick={() => toggleModal("modalTransport", r)}
                                          >
                                            <span className="btn-inner--icon mr-1">
                                              <i className="fa fa-truck" />
                                            </span>
                                            Enviado
                                          </Button>
                                        ) : (
                                          <Button
                                            className="btn-icon"
                                            color="info"
                                            onClick={() => toggleModal("modalDone", r)}
                                          >
                                            <span className="btn-inner--icon mr-1">
                                              <i className="fa fa-check" />
                                            </span>
                                            Entregue
                                          </Button>
                                        )
                                      }
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            ) : (null)
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            ) : null}
          </Container>
        </section>

        <Modal
          className="modal-dialog-centered"
          isOpen={modal.modalPreparing}
          toggle={() => toggleModal("modalPreparing")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Preparando
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal("modalPreparing")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {modalProduct ? (
              <Card className="shadow border-0">
                <CardBody className="py-3">
                  <h3 className="text-primary text-uppercase">
                    {modalProduct.name}
                  </h3>
                  <p className="description mt-3">
                    {modalProduct.description}
                  </p>
                  <h6 className="text-primary">
                    Dados do Pedido
                  </h6>
                  <p className="description mt-3">
                    {`#${modalProduct.id}`} - {format(new Date(modalProduct.created_at), 'yyyy-MM-dd hh:mm')}
                  </p>
                  <p className="description mt-3">
                    Seu pedido está sendo preparado pelo vendor e logo sairá para entrega!
                  </p>
                </CardBody>
              </Card>
            ) : null}
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={modal.modalTransport}
          toggle={() => toggleModal("modalTransport")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Enviado
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal("modalTransport")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {modalProduct ? (
              <Card className="shadow border-0">
                <CardBody className="py-3">
                  <h3 className="text-primary text-uppercase">
                    {modalProduct.name}
                  </h3>
                  <p className="description mt-3">
                    {modalProduct.description}
                  </p>
                  <h6 className="text-primary">
                    Dados do Pedido
                  </h6>
                  <p className="description mt-3">
                    {`#${modalProduct.id}`} - {format(new Date(modalProduct.created_at), 'yyyy-MM-dd hh:mm')}
                  </p>
                  <p className="description mt-3">
                    Seu pedido está a caminho! Acompanhe pelo código de entrega {modalProduct.track}
                  </p>
                </CardBody>
              </Card>
            ) : null}
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={modal.modalDone}
          toggle={() => toggleModal("modalDone")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Entregue
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal("modalDone")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {modalProduct ? (
              <Card className="shadow border-0">
                <CardBody className="py-3">
                  <h3 className="text-primary text-uppercase">
                  {modalProduct.name}
                  </h3>
                  <p className="description mt-3">
                    {modalProduct.description}
                  </p>
                  <h6 className="text-primary">
                    Dados do Pedido
                  </h6>
                  <p className="description mt-3">
                    {`#${modalProduct.id}`} - {format(new Date(modalProduct.created_at), 'yyyy-MM-dd hh:mm')}
                  </p>
                  <p className="description mt-3">
                    Seu pedido foi entregue, aproveite!
                  </p>
                </CardBody>
              </Card>
            ) : null}
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={modal.formUpdate}
          toggle={() => toggleModal("formUpdate")}
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-white pb-5">
                <div className="text-muted text-center">
                  Atualizar dados
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-address-book" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Endereço" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-address-book" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Bairro" type="text" value={block} onChange={(e) => setBlock(e.target.value)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-home" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="CEP" type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-home" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Cidade" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-home" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Estado" type="text" value={state} onChange={(e) => setState(e.target.value)} />
                    </InputGroup>
                  </FormGroup>
                  <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button
                      className="mt-2"
                      color="primary"
                      type="button"
                      onClick={() => updateProfile()}
                    >
                      Atualizar
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Modal>
      </main>
      <DefaultFooter />
    </>
  )
}
