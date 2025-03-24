import React, {useEffect, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import CartIcon from './CartIcon';


function NavBar(propsForShoingProductCountInCart) {

  const navigate = useNavigate();


 // Create a ref to the cart icon
//  const cartIconRef = useRef(null);

 // Event handler for cart icon click
 const handleCartClick = () => {
  alert(`cart countis : ${propsForShoingProductCountInCart.cartCount}`)
  navigate("/cart-checkout")
 };

 useEffect(()=>{

 })
 

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary"  >
      <Container>
        <img src='/tetgurukulLogo.png' alt='TetGurukulLogo' style={{height:70, width:100}}/>
        <Navbar.Brand href="/" className="mx-auto"  style={{fontFamily: 'Lobster, cursive', fontWeight: 'bold', fontSize:'45px', textAlign:'center', color:'black' }}>Tet-Gurukul</Navbar.Brand>
        
        
      </Container>
    </Navbar>

    <Navbar expand="lg" className="bg-body-tertiary"  >
      <Container>
        {/* <img src='/tetgurukulLogo.png' alt='TetGurukulLogo' style={{height:70, width:100}}/> */}
        {/* <Navbar.Brand href="/" style={{fontFamily: 'Lobster, cursive', fontWeight: 'bold', fontSize:'25px' }}>Tet-Gurukul</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about-us">About-Us</Nav.Link>
            

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
              
          </Nav>
          
        </Navbar.Collapse>
       
      </Container>
      {/* <Container className="text-left" style={{ fontSize: '12px' }}>
        <p>Available on Amazon & Flipkart, also.</p>
      </Container> */}
    <div>
    <CartIcon/>
    </div>
     
      
    </Navbar>
    </>
  );
}

export default NavBar;