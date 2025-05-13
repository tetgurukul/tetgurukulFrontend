//FRONTEND/src/components/pages/PrivacePolicy&TermsAndCondtions/PrivacyPolicy.jsx

import React from 'react';
import NavBar from "../../components/NavBar";
import {Container} from 'react-bootstrap'


export const PrivacePolicy = () => {



     return (
        <Container fluid>
             <NavBar/>
        <div className="privacy-policy-container">
           
            <h1>Privacy Policy for TetGurukul.com</h1>
            <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

            <section className="policy-section">
                <h2>1. Introduction</h2>
                <p>
                    Welcome to TetGurukul.com ("we", "our", or "us"). We are committed to protecting your personal data and your right to privacy.
                    This Privacy Policy outlines how we collect, use, and protect your information when you access or use our website or services,
                    especially when purchasing our handwritten study notes.
                </p>
            </section>

            <section className="policy-section">
                <h2>2. Information We Collect</h2>
                <p>We collect the following types of personal information when you interact with our website:</p>
                <ul className="info-list">
                    <li><strong>Contact details:</strong> Name, email address, phone number, WhatsApp number</li>
                    <li><strong>Shipping address:</strong> Full delivery address including PIN Code and landmarks</li>
                    <li><strong>Payment information:</strong> Transaction details (processed securely via Razorpay or other third-party gateways – we do not store card details)</li>
                    <li><strong>Purchase history:</strong> Records of items purchased from our site</li>
                </ul>
            </section>

            <section className="policy-section">
                <h2>3. How We Use Your Information</h2>
                <p>We use your information strictly for the following purposes:</p>
                <ul className="info-list">
                    <li>To process and deliver your orders</li>
                    <li>To contact you regarding your order or respond to customer service requests</li>
                    <li>To improve our product offerings and website functionality</li>
                    <li>To comply with applicable laws, regulations, and prevent fraud or abuse</li>
                </ul>
                <p>
                    We do not sell, rent, or trade your personal data to third parties for marketing or advertising. Your data is used only for operational and legal purposes.
                </p>
            </section>

            <section className="policy-section">
                <h2>4. Data Security</h2>
                <p>
                    We implement industry-standard security practices to protect your personal data. 
                    All transactions are handled securely through encrypted payment gateways (e.g., Razorpay), and sensitive payment data is never stored on our servers.
                </p>
            </section>

            <section className="policy-section">
                <h2>5. Cookies & Tracking</h2>
                <p>
                    We may use cookies to enhance user experience and gather limited analytics. You can control cookie usage through your browser settings.
                </p>
            </section>

            <section className="policy-section">
                <h2>6. Account Creation</h2>
                <p>
                    You are not required to create an account to use our services. Orders can be placed directly as a guest, but your contact and order details will be stored securely for service purposes.
                </p>
            </section>

            <section className="policy-section">
                <h2>7. Your Rights</h2>
                <p>
                    You have the right to access, correct, or request deletion of your personal data. To do so, you may contact us using the details below.
                    <br/>
                    send your request on: <a href='mailto: tetgurukul@gmail.com'>tetgurukul@gmail.com</a>
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

            <section className="policy-section">
                <h2>8. Changes to This Privacy Policy</h2>
                <p>
                    We reserve the right to update this Privacy Policy as necessary. Changes will be posted on this page with a revised effective date. Please review this policy periodically.
                </p>
            </section>

            <section className="policy-section">
                <h2>9. Contact Us</h2>
                <p>
                    If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us:
                    <br />
                    Email: <a href="mailto:tetgurukul@gmail.com">tetgurukul@gmail.com</a>
                    <br />
                    Website: <a href="https://www.tetgurukul.com">www.tetgurukul.com</a>
                </p>
            </section>
        </div>
        </Container>
    );
};