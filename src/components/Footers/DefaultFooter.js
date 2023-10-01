import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Modal,
  Card,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

class CardsFooter extends React.Component {
  state = {};
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  render() {
    return (
      <>
        <footer className="footer">
          <Container>
            <Row className="row-grid align-items-center my-md">
              <Col lg="6">
                <h3 className="text-primary font-weight-light mb-2">
                  Agradecemos seu apoio!
                </h3>
                <h4 className="mb-0 font-weight-light">
                  Entre em contato conosco em caso de dúvidas ou sugestões.
                </h4>
              </Col>
              <Col className="text-lg-center btn-wrapper" lg="6">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  size="lg"
                  onClick={() => this.toggleModal("formModal")}
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-envelope-o mr-2" />
                  </span>
                  <span className="nav-link-inner--text ml-1">
                    Entrar em contato
                  </span>
                </Button>
                <Modal
                  className="modal-dialog-centered"
                  size="sm"
                  isOpen={this.state.formModal}
                  toggle={() => this.toggleModal("formModal")}
                >
                  <div className="modal-body p-0">
                    <Card className="bg-secondary shadow border-0">
                      <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                          <small>Entrar em contato</small>
                        </div>
                        <Form role="form">
                          <FormGroup
                            className={classnames("mb-3", {
                              focused: this.state.emailFocused,
                            })}
                          >
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="E-mail"
                                type="email"
                                onFocus={(e) =>
                                  this.setState({ emailFocused: true })
                                }
                                onBlur={(e) =>
                                  this.setState({ emailFocused: false })
                                }
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup
                            className={classnames({
                              focused: this.state.passwordFocused,
                            })}
                          >
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
              </Col>
            </Row>
            <hr />
          </Container>
        </footer>
      </>
    );
  }
}

export default CardsFooter;
