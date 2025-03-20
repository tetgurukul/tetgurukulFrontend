import React, {useEffect, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';


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
            <Nav.Link href="#link">About-Us</Nav.Link>
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

      {/* shows cart icon with count of product added in cart */}
      <div
      style={{display:'grid', alignItems:'center', alignContent:'center'}}>

      <svg
     
      className='cart'
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        class="bi bi-cart"
        viewBox="0 0 16 16"
        onClick={handleCartClick} 
      >
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        
      </svg>
      <small style={{paddingLeft:'12px'}}>Cart</small>
      {/* <div>{propsForShoingProductCountInCart.cartCount}</div> */}

      </div>
      
      
    </Navbar>
    </>
  );
}

export default NavBar;