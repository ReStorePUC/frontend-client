import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import classnames from "classnames";

// reactstrap components
import { 
  Container, 
  Row,
  Col,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  TabPane,
  TabContent,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/DefaultFooter.js";

import api from "../../service/api"

const options = [
  'Chapéus',
  'Cabelo',
  'Feminino'
]

export default function Index () {
  const [plainTabs, setPlainTabs] = useState(1);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("key"))
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState(null)
  const [stores, setStores] = useState(null)

  const navigate = useNavigate()

  const searchProducts = async (key, categories = null) => {
    try {
      let query = `/product/search?name=${key}`

      if (categories) {
        query += `&categories=${categories.join(',')}`
      }
      const result = await api.get(query);
      setProducts(result.data);
    } catch (err) {
    }
  }

  const searchStores = async (key) => {
    try {
      const result = await api.get(`/user/store/search/${key}`);
      setStores(result.data);
    } catch (err) {
    }
  }

  const getSearch = (key, categories) => {
    searchProducts(key, categories)
    searchStores(key)
  }

  const addCategory = (category) => {
    let newCategories = [...categories]
    newCategories.push(category)
    setCategories(newCategories)
  }

  const removeCategory = (category) => {
    setCategories(categories.filter(function(c) { 
      return c !== category 
  }))
  }

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setPlainTabs(index);
  };

  useEffect(() => {
    searchProducts(search, categories);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories])

  useEffect(() => {
    getSearch(search);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative">
          <section className="section section-shaped">
            <div className="shape shape-style-1 shape-default">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                <Col lg="12">
                    <Row className="wrapper mt-4">
                      <Col lg="10" sm="8">
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-zoom-split-in" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </InputGroup>
                      </Col>
                      <Col lg="2" sm="4">
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                          onClick={() => getSearch(search, categories)}
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="fa fa-search" />
                          </span>
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
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
        </div>
        <section className="section">
          <Container>
            <Row>
              <Col lg="3" md="3">
                <div className="mb-3">
                  <small className="text-uppercase font-weight-bold">
                    Categorias
                  </small>
                </div>
                {options.map((c) => (
                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      className="custom-control-input"
                      id={`customCheck${c}`}
                      type="checkbox"
                      onChange={(e) => e.target.checked ? addCategory(c) : removeCategory(c)}
                    />
                    <label className="custom-control-label" htmlFor={`customCheck${c}`}>
                      <span>{c}</span>
                    </label>
                  </div>
                ))}
              </Col>
              <Col className="mt-lg-0" lg="9" md="9">
                <div className="mb-3">
                  <small className="text-uppercase font-weight-bold">
                    Resultados
                  </small>
                </div>
                <div className="nav-wrapper">
                  <Nav
                    className="nav-fill flex-column flex-md-row"
                    id="tabs-icons-text"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        aria-selected={plainTabs === 1}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: plainTabs === 1,
                        })}
                        onClick={(e) => toggleNavs(e, "plainTabs", 1)}
                        role="tab"
                      >
                        Produtos
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        aria-selected={plainTabs === 2}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: plainTabs === 2,
                        })}
                        onClick={(e) => toggleNavs(e, "plainTabs", 2)}
                        href="#pablo"
                        role="tab"
                      >
                        Lojas
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                  <TabContent activeTab={"plainTabs" + plainTabs}>
                    <TabPane tabId="plainTabs1">
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
                                <Row>
                                  <Col>
                                    <h3 className="text-primary text-uppercase">
                                      R$ {p.price.toFixed(2)}
                                    </h3>
                                  </Col>
                                  <Col>
                                    <Button
                                      className="btn-icon"
                                      color="info"
                                      onClick={() => navigate(`/produto/${p.id}`)}
                                    >
                                      Ver detalhes
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      )) : null}
                    </TabPane>
                    <TabPane tabId="plainTabs2">
                      {stores ? stores.map((s) => (
                        <Card className="shadow border-0 mt-2">
                          <CardBody className="py-3">
                            <Row>
                              <Col lg="4">
                                <img
                                  alt="..."
                                  className="img-center img-fluid shadow shadow-lg--hover"
                                  src={s.photo_path}
                                  style={{ width: "100px" }}
                                />
                              </Col>
                              <Col lg="8">
                                <h6 className="text-primary text-uppercase">
                                  {s.name}
                                </h6>
                                <p className="description mt-3">
                                  <p>
                                    {s.address}
                                  </p>
                                  <p>
                                    {s.block}, {s.city} - {s.state}
                                  </p>
                                </p>
                                <Button
                                  className="btn-icon"
                                  color="info"
                                  onClick={() => navigate(`/loja/${s.id}`)}
                                >
                                  Ver detalhes
                                </Button>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      )) : null}
                    </TabPane>
                  </TabContent>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <CardsFooter />
    </>
  );
}
