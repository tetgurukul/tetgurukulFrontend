import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

function Footer() {



  useEffect(() => {
    // Add any side effects here if needed
  }, []);

  return (
    <>
      {/* Using the <footer> HTML element */}
      <footer style={{ backgroundColor: '#800080', padding: '20px', color:'white', }}>
        <Container className="text-left" style={{ fontSize: '12px' }}>
          {/* Contact Info */}
          
          <div>
            <p style={{fontSize:'15px'}}>We are also available on  <img src='./amazon-logo-white.png' style={{width:'65px', marginTop: '8px'}}/> & <img src='./flipkart-logo-white.png' style={{width:'85px', marginTop: '-2px'}}/></p>
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
