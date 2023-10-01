import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'

// reactstrap components
import { 
  Card,
  Button, 
  Container, 
  Row, 
  Col,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

import api from "../../service/api"
import { getValue, clearCart } from "../../service/storage"

export default function Profile () {
  const [updated, setUpdated] = useState(null);
  const [searchParams] = useSearchParams();
  
  const navigate = useNavigate();

  const updateRequest = async () => {
    try {
      const user = getValue()

      await api.post(`shop/private/confirm-request/${searchParams.get("preference_id")}`, 
      {},
      {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      setUpdated(true);
    } catch {}
  }

  useEffect(() => {
    updateRequest();
    clearCart();
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
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col lg="12">
                    <div className="text-center mt-5 mb-5">
                      {updated ? (
                        <>
                          <h1>
                            Pagamento confirmado!
                          </h1>
                          <p>Aguarde a loja enviar o produto</p>
                          <Button
                            color="default"
                            size="lg"
                            onClick={() => navigate('/perfil')}
                          >
                            Ver meus pedidos
                          </Button>
                        </>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <DefaultFooter />
    </>
  );
}
