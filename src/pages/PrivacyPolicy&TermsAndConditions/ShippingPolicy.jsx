//FRONTEND/src/components/pages/PrivacePolicy&TermsAndCondtions/ShippingPolicy.jsx

import React from 'react';
import NavBar from "../../components/NavBar";
import {Container} from 'react-bootstrap'


export const ShippingPolicy = () => {



     return (
        <Container fluid>
             <NavBar/>
        <div className="privacy-policy-container">
      <h1>Shipping Policy</h1>
      <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="policy-section">
        <h2>Shipping Coverage</h2>
        <p>We currently ship handwritten notes across India via trusted courier partners.</p>
      </section>

      <section className="policy-section">
        <h2>Shipping Time</h2>
        <p>Orders are typically dispatched within 2–3 business days after order confirmation. Delivery time may vary based on your location but generally takes 4–7 business days.</p>
      </section>

      <section className="policy-section">
        <h2>Shipping Charges</h2>
        <p>Shipping costs are calculated at checkout based on location and weight. Any free shipping offers will be explicitly mentioned on the product page.</p>
      </section>

      <section className="policy-section">
        <h2>Tracking Orders</h2>
        <p>You can directly contact on whatsapp and number mentioned in the contact section for order query and details.</p>
      </section>

      <section className="policy-section">
        <h2>Contact</h2>
        <p>For shipping-related queries, please contact us at:  
          <br />
          Email: <a href="mailto:tetgurukul@gmail.com">tetgurukul@gmail.com</a>  
          <br />
          WhatsApp: <a href="https://wa.me/9811686905" target="_blank" rel="noopener noreferrer">9811686905</a>
        </p>
      </section>
    </div>
    </Container>
  );
};