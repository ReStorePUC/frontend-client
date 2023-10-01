import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Card,
  CardHeader,
  CardBody,
  Modal,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
} from "reactstrap";

import api from "../../service/api"
import { getValue, setValue, getCartValue, removeCartValue } from "../../service/storage"

export default function DemoNavbar () {
  const [modal, setModals] = useState({});
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toggleModal = (state) => {
    const cartValue = getCartValue();
    setCart(cartValue);
    setModals({
      [state]: !modal[state],
    });
  };

  const removeCart = (id) => {
    removeCartValue(id);
    const cartValue = getCartValue();
    setCart(cartValue);
  }

  const login = async () => {
    if (email === "" || password === "") {
      setError("Insira as credênciais");
      return;
    }
  
    try {
      const result = await api.post(`user/login`, {
        email: email,
        password: password,
      });
      if (result.data.IsAdmin) {
        setError("Login invalido");
        return;
      }

      setValue({
        JWT: result.data.JWT,
      });

      navigate('/perfil')
    } catch (err) {
      setError("Erro no login, tente novamente!");
    }
  }

  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();

    const user = getValue()
    setUser(user)

    const cartValue = getCartValue()
    setCart(cartValue)
  }, [])

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img
                alt="..."
                src={require("assets/img/brand/logo.png")}
                style={{ width: "150px", height: "50px" }}
              />
            </NavbarBrand>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      onClick={() => toggleModal("formCart")}
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-shopping-cart mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Meu carrinho
                      </span>
                    </Button>
                    <Modal
                      className="modal-dialog-centered"
                      isOpen={modal.formCart}
                      toggle={() => toggleModal("formCart")}
                    >
                      <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-default">
                          Meu Carrinho
                        </h6>
                        <button
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => toggleModal("formCart")}
                        >
                          <span aria-hidden={true}>×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {cart ? cart.map((c) => (
                          <Card className="shadow border-0 mt-2">
                            <CardBody className="py-3">
                              <Row>
                                <Col lg="4">
                                  <img
                                    alt="..."
                                    className="img-center img-fluid shadow shadow-lg--hover"
                                    src={c.images[0].image_path}
                                    style={{ width: "100px" }}
                                  />
                                </Col>
                                <Col lg="8">
                                  <h6 className="text-primary text-uppercase">
                                    {c.name}
                                  </h6>
                                  <p className="description mt-3">
                                    {c.description}
                                  </p>
                                  <Button
                                    color="secondary"
                                    onClick={() => removeCart(c.id)}
                                  >
                                    <span className="btn-inner--icon">
                                      <i className="fa fa-trash mr-2" />
                                    </span>
                                    <span className="nav-link-inner--text ml-1">
                                      Remover item
                                    </span>
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        )) : null}
                      </div>
                      <div className="modal-footer">
                        <Button 
                          color="primary" 
                          type="button" 
                          onClick={user ? () => navigate("/checkout") : () => toggleModal('formModal')}
                          disabled={!cart || cart.length === 0}
                        >
                          Prosseguir para checkout
                        </Button>
                      </div>
                    </Modal>
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      onClick={user ? () => navigate("/perfil") : () => toggleModal('formModal')}
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-user-circle mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Minha conta
                      </span>
                    </Button>
                    <Modal
                      className="modal-dialog-centered"
                      size="sm"
                      isOpen={modal.formModal}
                      toggle={() => toggleModal("formModal")}
                    >
                      <div className="modal-body p-0">
                        {error ? (
                          <Alert color="danger">
                            <strong>Erro!</strong> {error}
                          </Alert>
                        ) : null }
                        <Card className="bg-secondary shadow border-0">
                          <CardHeader className="bg-white pb-5">
                            <div className="text-muted text-center">
                              Login
                            </div>
                          </CardHeader>
                          <CardBody className="px-lg-5 py-lg-5">
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
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup className="input-group-alternative">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="ni ni-lock-circle-open" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    placeholder="Senha"
                                    type="password"
                                    autoComplete="off"
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
                                </InputGroup>
                              </FormGroup>
                              <div className="justify-content-center">
                                <a href="/cadastrar">
                                  Criar conta
                                </a>
                              </div>
                              <div className="text-center">
                                <Button 
                                  className="my-4" 
                                  color="primary" 
                                  type="button" 
                                  onClick={() => login()}
                                >
                                  Login
                                </Button>
                              </div>
                            </Form>
                          </CardBody>
                        </Card>
                      </div>
                    </Modal>
                  </DropdownToggle>
                </UncontrolledDropdown>
              </Nav>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
