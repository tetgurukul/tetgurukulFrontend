//FRONTEND/src/components/pages/PrivacePolicy&TermsAndCondtions/TermsAndConditions.jsx

import React from "react"
import {Container} from 'react-bootstrap'
import NavBar from "../../components/NavBar";
export const TermsAndConditions = () => {



    return (
        <Container fluid>
            <NavBar/>
        <div className="privacy-policy-container">
            <h1>Terms and Conditions for TetGurukul.com</h1>
            <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

            <section className="policy-section">
                <h2>1. Introduction</h2>
                <p>
                    These Terms and Conditions ("Terms") govern your use of TetGurukul.com ("we", "our", or "us"). By accessing or purchasing from our website, you agree to be bound by these Terms. Please read them carefully.
                </p>
            </section>

            <section className="policy-section">
                <h2>2. Products & Services</h2>
                <p>
                    TetGurukul.com provides handwritten study notes and educational materials. All products listed are for individual use only and are non-transferable.
                </p>
            </section>

            <section className="policy-section">
                <h2>3. Orders & Payments</h2>
                <ul className="info-list">
                    <li>All orders are confirmed only upon successful payment.</li>
                    <li>We use secure third-party payment gateways like Razorpay for processing transactions.</li>
                    <li>Once confirmed, orders cannot be cancelled or refunded except under specific conditions mentioned below.</li>
                </ul>
            </section>

            <section className="policy-section">
                <h2>4. Shipping & Delivery</h2>
                <p>
                    Products are shipped to the address provided during checkout. We are not responsible for delays caused by incorrect or incomplete shipping information.
                </p>
            </section>

           <section className="policy-section">
    <h2>5. Returns & Refunds</h2>
    <ul className="info-list">
        <li>Due to the nature of handwritten notes, we do not accept returns once the order has been dispatched.</li>
        <li>Refunds will only be considered in cases where the item was not delivered or was severely damaged during transit.</li>
        <li>All refund requests must be made within 7 days of delivery and must include clear photographic evidence of the issue.</li>
        <li>
            To request a refund, you may contact us through any of the following methods:
            <ul>
                <li>
                    Email: <a href="mailto:tetgurukul@gmail.com">tetgurukul@gmail.com</a>
                </li>
                <li>
                    Website: <a href="https://www.tetgurukul.com" target="_blank" rel="noopener noreferrer">www.tetgurukul.com</a>
                </li>
                <li>
                    WhatsApp: <a
                        href="https://wa.me/919811686905"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        9811686905
                    </a>
                </li>
            </ul>
        </li>
        <li>Customers must share details of the issue along with relevant images via email or WhatsApp.</li>
        <li>Once our team verifies the issue and confirms it is genuine, the refund will be initiated within 7 business days.</li>
        <li>Refunds will be credited to the original payment method used during the transaction.</li>
    </ul>
</section>


            <section className="policy-section">
                <h2>6. Intellectual Property</h2>
                <p>
                    All study material and content on TetGurukul.com are copyrighted. You may not reproduce, share, or distribute them without written permission from us.
                </p>
            </section>

            <section className="policy-section">
                <h2>7. User Conduct</h2>
                <p>
                    You agree not to misuse the website or its content. Any attempt to exploit, hack, or disrupt our services is strictly prohibited and may result in legal action.
                </p>
            </section>

            <section className="policy-section">
                <h2>8. Modifications</h2>
                <p>
                    We reserve the right to update or change these Terms at any time. Continued use of the website after any changes implies acceptance of the new Terms.
                </p>
            </section>

            <section className="policy-section">
                <h2>9. Governing Law</h2>
                <p>
                    These Terms shall be governed and interpreted in accordance with the laws of India. Any disputes arising shall be subject to the jurisdiction of courts in your delivery district/state.
                </p>
            </section>

            <section className="policy-section">
                <h2>10. Contact Us</h2>
                <p>
                    For any queries regarding these Terms and Conditions, please contact us:
                    <br />
                    Email: <a href="mailto:tetgurukul@gmail.com">tetgurukul@gmail.com</a>
                    <br />
                    Website: <a href="https://www.tetgurukul.com">www.tetgurukul.com</a>
                    <br/>
                    whatsapp : <a
      href="https://wa.me/9811686905" // Replace with your number in international format e.g. 919876543210
      target="_blank"
      rel="noopener noreferrer"
      
    >
     9811686905
    </a>
                </p>
            </section>
        </div>
        </Container>
    );
};

