import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

import api from "../../service/api"

export default function Landing () {
  const [products, setProducts] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate()

  const getProducts = async () => {
    try {
      const result = await api.get(`product/product/recent`);
      setProducts(result.data);
    } catch (err) {
    }
  }

  useEffect(() => {
    getProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="6">
                    <h1 className="display-3 text-white">
                      Busque pelo produto ideal para você{" "}
                      <span>contribuindo para um mundo mais limpo!</span>
                    </h1>
                  </Col>
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
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </InputGroup>
                      </Col>
                      <Col lg="2" sm="4">
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                          onClick={() => navigate(`/busca?key=${search}`)}
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
        </div>
        <section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  {products ? products.map((p) => (
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0 mt-4">
                        <CardBody className="py-3">
                          <img
                            alt="..."
                            className="img-center img-fluid shadow shadow-lg--hover"
                            src={p.images ? p.images[0].image_path : ''}
                            style={{ width: "200px" }}
                          />
                          <h6 className="text-primary text-uppercase mt-4">
                            {p.name}
                          </h6>
                          <p className="description mt-3">
                            {p.description}
                          </p>
                          <div>
                            {p.categories ? p.categories.split(',').map((c) => (
                              <Badge color="primary" pill className="mr-1">
                                {c}
                              </Badge>
                            )) : null}
                          </div>
                          <Button
                            className="mt-4"
                            color="primary"
                            onClick={() => navigate(`/produto/${p.id}`)}
                          >
                            Ver mais
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  )) : null}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <DefaultFooter />
    </>
  );
}
