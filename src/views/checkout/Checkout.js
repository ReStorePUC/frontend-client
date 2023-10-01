import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

// reactstrap components
import { 
  Card,
  CardBody, 
  Container, 
  Row, 
  Col,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

import api from "../../service/api"
import { getValue, getCartValue } from "../../service/storage"

initMercadoPago('TEST-69d74ce3-9dc6-40cf-9e78-ba6ce052cf9e');

export default function Profile () {
  const [paymentID, setPaymentID] = useState(null);
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const prepareRequest = async () => {
    const user = getValue()

    const result = await api.get(`user/private/self/profile`, {
      headers: {
        "Authorization": `Bearer ${user.JWT}`
      }
    });

    let items = []
    cart.map((c) => (
      items.push({
        price: c.price,
        tax: c.tax,
        store_id: c.store_id,
        product_id: c.id,
        user_id: result.data.id,
      })
    ))

    const payment = await api.post(`shop/private/request`, 
    {
      items: items,
    },
    {
      headers: {
        "Authorization": `Bearer ${user.JWT}`
      }
    });
    console.log(payment)
    setPaymentID(payment.data.ID)
  }

  useEffect(() => {
    const cartValue = getCartValue()
    setCart(cartValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (cart) {
      let totalValue = 0
      cart.map((c) => (
        totalValue += c.price
      ))
      setTotal(totalValue)

      let taxValue = 0
      cart.map((c) => (
        taxValue += c.tax
      ))
      setTax(taxValue)

      prepareRequest()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

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
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col lg="12">
                    <div className="text-center mt-5">
                      <h1>
                        Checkout
                      </h1>
                    </div>
                  </Col>
                </Row>
                <div className="border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <div className="mt-5">
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
                                  <h6 className="text-primary text-uppercase">
                                    R$ {c.price.toFixed(2)}
                                  </h6>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        )) : null}
                      </div>
                      <div className="mt-2 mb-5">
                        <Row>
                          <Col>
                            <div style={{ fontSize: 25, marginTop: 40}}>
                              Total: R$ {total.toFixed(2)}
                            </div>
                            <div>
                              <span className="h6 font-weight-300">Frete: R$ {tax.toFixed(2)}</span>
                            </div>
                          </Col>
                          <Col>
                            <div className="mt-4">
                              {paymentID ? (
                                <Wallet initialization={{ preferenceId: paymentID }} />
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <DefaultFooter />
    </>
  );
}
