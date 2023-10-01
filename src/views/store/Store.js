import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

// reactstrap components
import { 
  Button, 
  Card, 
  CardBody,
  Container, 
  Row, 
  Col,
  Modal,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

import api from "../../service/api"

export default function Profile () {
  let { id } = useParams();
  const [modal, setModals] = useState({});
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  const toggleModal = (state) => {
    setModals({
      [state]: !modal[state],
    });
  };

  const getProducts = async () => {
    try {
      const result = await api.get(`product/product/store/${id}?unavailable=false`);
      setProducts(result.data);
    } catch (err) {
    }
  }

  const getStore = async () => {
    try {
      const result = await api.get(`user/store/${id}`);
      setStore(result.data);
    } catch (err) {
    }
  }

  useEffect(() => {
    getStore()
    getProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <DemoNavbar />
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
            {store ? (
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={store.photo_path}
                        />
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="float-right"
                          color="default"
                          onClick={() => toggleModal("formModal")}
                          size="sm"
                        >
                          Enviar mensagem
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-8">
                    <h3>
                      {store.name}
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {store.address}
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {store.block}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      {store.city}, {store.state}
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        {products ? products.map((p) => (
                          <Card className="shadow border-0 mt-2">
                            <CardBody className="py-3">
                              <Row>
                                <Col lg="4">
                                  <img
                                    alt="..."
                                    className="img-center img-fluid shadow shadow-lg--hover"
                                    src={p.images ? p.images[0].image_path : ''}
                                    style={{ width: "100px" }}
                                  />
                                </Col>
                                <Col lg="8">
                                  <h6 className="text-primary text-uppercase">
                                    {p.name}
                                  </h6>
                                  <p className="description mt-3">
                                    {p.description}
                                  </p>
                                  <Button
                                    className="btn-icon"
                                    color="info"
                                    onClick={() => navigate(`/produto/${p.id}`)}
                                  >
                                    Ver detalhes
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        )) : null}
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            ) : null}
          </Container>
          <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={modal.formModal}
            toggle={() => toggleModal("formModal")}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Entrar em contato</small>
                  </div>
                  <Form role="form">
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="E-mail"
                          type="email"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <Input
                          placeholder="Mensagem"
                          rows="5"
                          type="textarea"
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button className="my-4" color="primary" type="button">
                        Enviar
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Modal>
        </section>
      </main>
      <DefaultFooter />
    </>
  );
}
