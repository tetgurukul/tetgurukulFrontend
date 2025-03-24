import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

function Footer() {

  const whatsappIcon = "./whatsappIcon.png"

  //Below snippet takes the users to whatsapp, when someone clicks on the whatsapp icon.

  const phoneNumber = '9811686905';
  const message = "Hello! From Tet-gurukul. Please whatsapp us your queries";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  //_________________________________________________________________

  useEffect(() => {
    // Add any side effects here if needed
  }, []);

  return (
    <>
      {/* Using the <footer> HTML element */}
      <footer style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
        <Container className="text-left" style={{ fontSize: '12px' }}>
          {/* Contact Info */}
          <div>
            <p>For queries: <a href={whatsappLink} target="_blank" rel="noopener noreferrer"><img src={whatsappIcon} alt='whatsapp logo'/> </a><strong>9811686905</strong></p>
          </div>
          <div>
            <p >We are also available on Amazon & Flipkart.</p>
          </div>
         <hr></hr>
        </Container>
        <Container  className="text-center" style={{ fontSize: '18px' }}>
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
