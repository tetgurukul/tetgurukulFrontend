import React,  { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container, Row, Col, Form } from "react-bootstrap";
import NavBar from "../components/NavBar";
import {getOrderByPhoneNumber} from "../services/orderServices";
import { useNavigate } from "react-router-dom";

//Context api imports
import { useOrderContext } from "./ContextApi/yourOrdersContextApi";
import { useProductContext } from "./ContextApi/ProductContextApi";


function OrderConfirmationPage() {

   //Context API inside /components/ProductContextApi.js
      
      const { addProductArrayInContext } = useProductContext();
      const { productContext } = useProductContext();
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

      console.log('i am from order confirmation page')
      console.log(productContext)
    

    //Initialiising useNavigate for conditional renderiing.
    const navigate = useNavigate();
    //______________________________________________________

    // Access the updateOrders function from context api
    const { updateOrders } = useOrderContext();
    //__________________________________


  //hooks for managing checking, orders of customers.
  const [showOrderBox, setShowOrderBox] = useState(true);
  //for storing user input number
  const [phone, setPhone] = useState("")
  //For holding order array returned by getOrderByPhoneNumber function
  const [customerOrders, setCustomerOrders] = useState ([])



  function handleSubmit() {
    alert("i got clicked");
    setShowOrderBox(true);

    console.log(showOrderBox);
  }

  //Handles and finds the order data of customers by calling backend api, stores it into context.
  const fetchCustomerProductData = async (phone) => {

    try {
      const response = await getOrderByPhoneNumber(phone)
    setCustomerOrders(response.data);
    console.log('i am inside fetchCUSTOMER')
    console.log(customerOrders);

    //updating the context api for yourOrders
       // Update the context with the fetched data
       //Now below context api can be accessed anywhere by the users.
       updateOrders(response.data);


       //_________________________________________________
      if (customerOrders.length !== 0){
        navigate('/customer-order')
      } else {
        console.log('no customer orders found')
        
        
      }
      

    } catch (error) {
      console.log('Please insert a valid number!')
    }
    

  }

  //Below useEffect manages the state mounting of yourOrders const. Cause if i set the yourOrders array on button click then, for the first time it sets to empty array. And i don't want that. So, if user types in in the input box any thing every single time query runs and state keeps mounting, in the end when user finally hits button, it sets the youOrder const with non empty array.
  useEffect(()=>{
    if(phone===""){
      console.log('insert a valid number')
    }else{fetchCustomerProductData(phone)}
  }, [phone])
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  return (
    <>
      <Container fluid>
        <nav>
          <NavBar />
        </nav>
        <div className="Order-Confirmation-Page">
          <div className="card-container">
            <h4>Congratulations!</h4>
            <hr />
            <Row>
              <Col>
                <div>
                  {/* All your form fields go here */}
                  <h3>
                    Your order has been placed. Click below to check your order
                    details.
                  </h3>
                  <br></br>
                  <br></br>
                  <br></br>
                  {/* <Button onClick={handleSubmit} variant="primary">
                    Check your orders.
                  </Button> */}
                </div>
              </Col>
            </Row>
<br></br>
            <div>
              {showOrderBox ? (
                <>
                  <div>
                    <Form>
                          <Form.Group>
                            <Form.Label>Enter your registered phone number to check your order details</Form.Label>
                            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                          </Form.Group>
                          
                    </Form>
                    <br></br>
                    <Button onClick={() => fetchCustomerProductData(phone)}>Click to see your order details.</Button>

                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default OrderConfirmationPage;
