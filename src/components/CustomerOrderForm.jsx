/*
1. When user clicks on "Click to buy from Cart&Checkout.jsx Page", then user is redirected to
this page.
2. Here user will be prompted to fill his/her details of delivery.
3. First we store the cutomer details in db.
4. Then we have user proceed to pay.

*/

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useProductContext } from "./ContextApi/ProductContextApi";
import { postOrder } from "../services/orderServices";
import { resolvePath, useNavigate } from "react-router-dom";
import { getOrderByOrderId } from "../services/orderServices";
import OrderConfirmationPage from "./OrderConfirmationPage";


export default function CustomerOrderForm() {

    //Dynamic navigation using useNavigate.
    const navigate = useNavigate();
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    //Context API inside /components/ProductContextApi.js
    //updates the context api
    const { addProductArrayInContext } = useProductContext();

    //Stores product added by user into context with count
    const { productContext } = useProductContext();
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  //Delivery data formatting and adding +3
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3); // Add 3 days
  const formattedDate = deliveryDate.toISOString().split("T")[0];

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

   //Total Price Calculator (Using reduce Method).

 const totalAmount = productContext.reduce((acc, eachItem) => acc + eachItem.product.salePrice * eachItem.count, 0 )
 console.log(`totalAmount price is: ${totalAmount}`)
 //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  //Creating useState hooks to store customer input values.


  const [order, setOrder] = useState({
    customerName: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: {
      houseNo: "",
      street: "",
      city: "",
      district: "",
      state: "",
      pinCode: "",
      country: "",
    },
    products: [],
    totalAmount: totalAmount,
    discount: 0,
    finalAmount: totalAmount,
    payment: {
        paymentId:"",
        paymentOrderId:"",
      paymentType: "",
      paymentMode: "",
      paymentStatus: "",
      transactionDate:""
    },
    shippingCharges: 0,
    deliveryDate: formattedDate,
    orderStatus: "Pending",
    remarks: "",
  });
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //Below formats the date. Then we use it to concat phone and date to create unq id.
  const currentDate = new Date();
  const formattedDated = currentDate.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD format

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


// useEffect(()=>{
//     console.log(`i am order.payment.paymentType: ${order.payment.paymentType}`)
// }, [order.payment.paymentType])

 

  
//Creating useState hooks for getting data posted in db by handle submit, and will retrieve the orderId for managing payment.
const [customerOrderId, setCustomerOrderId] = useState("");
const [customerOrderObject, setCutomerOrderObject] = useState({})


  
  //Handles the form submit.
  let orderId;
  const handleSubmit = async (e) => {
    e.preventDefault();
     orderId = order.phone + formattedDated;
    setCustomerOrderId(orderId)
    console.log(orderId);
  
  
    // Prepare the order data in the right format
      const products = productContext.map((item) => {
      const { product, count } = item;
      const totalPrice = product.salePrice * count; // Calculate total price for the product 
  
      return {
        productId: product._id, // Assuming product._id is the correct ObjectId
        productName: product.productName,
        price: product.salePrice,
        quantity: count,
        totalPrice: totalPrice,
      };
    });
  
    const data = {
      orderId,
      customerName: order.customerName,
      email: order.email,
      phone: order.phone,
      whatsapp: order.whatsapp,
      remarks: order.remarks,
      address: order.address,
      products: products,
      shippingCharges: order.shippingCharges,
      deliveryDate: order.deliveryDate,
      orderStatus: order.orderStatus,


      //Total amount.
      totalAmount: order.totalAmount,
      discount: order.discount,
      finalAmount: order.finalAmount,
      payment: {
        paymentId: "", // Empty string or null if not available
        paymentOrderId: "", // Empty string or null if not available
        paymentType: order.payment.paymentType, // Will be selected from dropdown
        paymentMode: "", // Empty string or null if not available
        paymentStatus: "", // Empty string or null if not available
        transactionDate: "", // Empty string or null if not available
    }, // Added paymentMode

    };
  
    console.log("Data being sent:", data); // Log to check the data
  
    // Send the data as JSON instead of FormData
    try {
     await postOrder(data);



      setOrder({
        customerName: "",
        email: "",
        phone: "",
        whatsapp: "",
        remarks: "",
        address: "",
        shippingCharges: "",
        deliveryDate: "",
        orderStatus: "",
        totalAmount: "",
        discount: "",
        finalAmount: "",
        payment: ""
        
      });

      // Reset products context if needed (if you're managing state for products)
      productContext.forEach((item) => {
        item.count = 0; // Reset count if needed
      });

      // If you need to reset the form:
      e.target.reset();
      

        

       //Handles payment
  const handlePay = async (orderId) =>{
    if (order.payment.paymentType === "COD"){
       
        console.log("Order Successful, payment mode is COD")
        navigate('/order-confirmation')
    } else {
      console.log("Order Successful, payment mode is COD")
     try {
        
      const response = await getOrderByOrderId(orderId)
      setCutomerOrderObject(response.data);
      console.log(`i am customer order id data inside try block respnse.data: ${response.data}`)


      //navigate("/payment", {state: {payableAmount: order.finalAmount, orderId:orderId}})

      
     } catch (error) {
      alert('some error occured while getting product data by order by id')
     }
        
    }
  }

  handlePay();


    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //Below useEffect only works when the customerOrder id is set.

  useEffect(() => {
    // Only navigate if customerOrderId is valid and not empty
    if (customerOrderId && customerOrderId !== "undefined" && customerOrderId !== null && order.payment.paymentType === "Online") {
      navigate("/payment", {
        state: { payableAmount: order.finalAmount, orderId: customerOrderId },
      });
    }
  }, [customerOrderId, order.finalAmount, navigate]);
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  
  return (
    <>
      <Container fluid>
        <nav>
          <NavBar />
        </nav>
        <hr></hr>
        <h4>Add Your Delivery Address and Contact Details:</h4>
        <hr></hr>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              {/* Customer Details */}
              <Form.Group className="mb-3" controlId="customerName">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter customer name"
                  name="customerName"
                  value={order.customerName}
                  onChange={(e) =>
                    setOrder({ ...order, customerName: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={order.email}
                  onChange={(e) =>
                    setOrder({ ...order, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  value={order.phone}
                  onChange={(e) =>
                    setOrder({ ...order, phone: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="whatsapp">
                <Form.Label>WhatsApp</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter WhatsApp number"
                  name="whatsapp"
                  value={order.whatsapp}
                  onChange={(e) =>
                    setOrder({ ...order, whatsapp: e.target.value })
                  }
                  required
                />
              </Form.Group>

              {/* Address Details */}
              {/* <h4>Address</h4> */}
              <Form.Group className="mb-3" controlId="houseNo">
                <Form.Label>
                  Flat, House no., Building, Company, Apartment
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter house number"
                  name="houseNo"
                  value={order.address.houseNo}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      address: { ...order.address, houseNo: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="street">
                <Form.Label>Area, Street, Sector, Village</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter street"
                  name="street"
                  value={order.address.street}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      address: { ...order.address, street: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  value={order.address.city}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      address: { ...order.address, city: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="district">
                <Form.Label>District</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter district"
                  name="district"
                  value={order.address.district}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      address: { ...order.address, district: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state"
                  name="state"
                  value={order.address.state}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      address: { ...order.address, state: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="pinCode">
                <Form.Label>Pin Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter pin code"
                  name="pinCode"
                  value={order.address.pinCode}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      address: { ...order.address, pinCode: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Landmark</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter landmark"
                  name="country"
                  value={order.address.country}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      address: { ...order.address, country: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Any remarks"
                  name="remarks"
                  value={order.remarks}
                  onChange={(e) =>
                    setOrder({ ...order, remarks: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="paymentType">
  <Form.Label>Payment Method</Form.Label>
  <Form.Control
    as="select"
    name="paymentType"
    value={order.payment.paymentType}
    onChange={(e) => {
      setOrder((prevState) => ({
        ...prevState,
        payment: {
          ...prevState.payment,
          paymentType: e.target.value,  // Correctly update the paymentType
        },
      }));
    }}
    required
  >
    <option value="">Select Payment Method</option>
    <option value="COD">Cash on Delivery (COD)</option>
    <option value="Online">Online Payment</option>
  </Form.Control>
</Form.Group>
      <Row>
      <Button  variant="primary" type="submit">
                Submit and Proceed to Pay
              </Button>
      </Row>
              
              <hr></hr>
        
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
