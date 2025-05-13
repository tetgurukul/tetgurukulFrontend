//FRONTEND/src/components/pages/PrivacePolicy&TermsAndCondtions/CancellationAndRefundPolicy.jsx

import React from 'react';
import NavBar from "../../components/NavBar";
import {Container} from 'react-bootstrap'


export const CancellationAndRefundPolicy = () => {



     return (
        <Container fluid>
            <NavBar/>
    <div className="privacy-policy-container">
      <h1>Cancellation & Refund Policy</h1>
      <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="policy-section">
        <h2>Cancellations</h2>
        <p>Orders can only be cancelled within 12 hours of placing the order. To cancel, contact us via email or WhatsApp with your order ID.</p>
      </section>

      <section className="policy-section">
        <h2>Refunds</h2>
        <p>Refunds will only be processed in the following scenarios:</p>
        <ul className="info-list">
          <li>The item was not delivered.</li>
          <li>The item was severely damaged during shipping (with proof).</li>
        </ul>
        <p>
          To request a refund, please email or WhatsApp us with your issue and supporting images.  
          Once verified, the refund will be initiated within 7 business days to the same account used for payment.
        </p>
      </section>

      <section className="policy-section">
        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:tetgurukul@gmail.com">tetgurukul@gmail.com</a>  
          <br />
          WhatsApp: <a href="https://wa.me/9811686905" target="_blank" rel="noopener noreferrer">9811686905</a>
        </p>
      </section>
    </div>
    </Container>
  );
};