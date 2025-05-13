import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";

function Footer() {
  useEffect(() => {
    // Add any side effects here if needed
  }, []);

  return (
    <>
      {/* Using the <footer> HTML element */}
      <footer className="footer-main">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Container className="text-left" style={{ fontSize: "12px" }}>
            {/* Contact Info */}

            <div>
              <p style={{ fontSize: "15px" }}>
                We are also available on{" "}
                <img
                  src="./amazon-logo-white.png"
                  style={{ width: "65px", marginTop: "8px" }}
                />{" "}
                &{" "}
                <img
                  src="./flipkart-logo-white.png"
                  style={{ width: "85px", marginTop: "-2px" }}
                />
              </p>
            </div>
            <p>
              <p>Conrtact us on below:</p>
              Email:{" "}
              <a style={{  color:'white' }} href="mailto:tetgurukul@gmail.com">tetgurukul@gmail.com</a>
              <br />
           
              whatsapp :{" "}
              <a style={{  color:'white' }}
                href="https://wa.me/9811686905" // Replace with your number in international format e.g. 919876543210
                target="_blank"
                rel="noopener noreferrer"
              >
                9811686905
              </a>
            </p>
          </Container>
          <Container className="text-end" style={{ fontSize: "12px" }}>
            {/* Contact Info */}
            <div>
              <p style={{ fontSize: "15px", color:'white' }}>
                <a style={{ color:'white' }} href="/privacy-policy" target="__blank">
                  Privacy Policies
                </a>
              </p>
            </div>
            <div>
              <p style={{ fontSize: "15px", color:'white' }}>
                <a style={{  color:'white' }} href="/terms-and-conditions" target="__blank">
                  Terms & Conditions
                </a>
              </p>
            </div>
            <div>
              <p style={{ fontSize: "15px", color:'white' }}>
                <a style={{  color:'white' }} href="/shipping-policy" target="__blank">
                  Shipping Policies
                </a>
              </p>
            </div>
             <div>
              <p style={{ fontSize: "15px", color:'white' }}>
                <a style={{  color:'white' }} href="/cancellation-and-refund-policy" target="__blank">
                  Cancellation & Refund Policies
                </a>
              </p>
            </div>
          </Container>
        </div>

        <hr></hr>

        <Container className="text-center" style={{ fontSize: "18px" }}>
          {/* Footer Links */}
          <div>
            <p>&copy; 2025 Tet-Gurukul. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
