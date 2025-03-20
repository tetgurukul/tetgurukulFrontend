import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

function Footer() {

  useEffect(() => {
    // Add any side effects here if needed
  }, []);

  return (
    <>
      {/* Using the <footer> HTML element */}
      <footer style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
        <Container className="text-center" style={{ fontSize: '18px' }}>
          {/* Contact Info */}
          <div>
            <p>For queries and order details, contact or WhatsApp us at: <strong>9811686905</strong></p>
          </div>

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
