import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/RegisterNavbar.js";

import api from "../../service/api"
import { setValue } from "../../service/storage"

export default function Register () {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [block, setBlock] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();

  const saveProfile = async () => {
    try {
      const result = await api.post(`user/profile`, 
      {
        user: {
          email: email,
          password: password,
          is_admin: false
        },
        name: name,
        address: address,
        block: block,
        city: city,
        state: state,
        zip_code: zipCode,
      });

      setValue({
        JWT: result.data.JWT,
      })

      navigate('/perfil')
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <>
      <DemoNavbar />
      <main>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-10">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                  <div className="text-center text-muted mb-4">
                      <small>Registre-se com suas credenciais</small>
                    </div>
                    <Form role="form">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-user-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Nome" type="text" onChange={(e) => setName(e.target.value)}/>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83"/>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="E-mail" type="email" onChange={(e) => setEmail(e.target.value)} />
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
                    </Form>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Dados para entrega</small>
                    </div>
                    <Form role="form">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-address-book" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Endereço" type="text" onChange={(e) => setAddress(e.target.value)} />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-address-book" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Bairro" type="text" onChange={(e) => setBlock(e.target.value)} />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-home" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="CEP" type="text" onChange={(e) => setZipCode(e.target.value)} />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-home" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Cidade" type="text" onChange={(e) => setCity(e.target.value)} />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-home" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Estado" type="text" onChange={(e) => setState(e.target.value)} />
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
                          onClick={() => saveProfile()}
                        >
                          Criar Conta
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
