//After user clicks on check your order button, customers are redirected to this page. where the can check their orders they placed.

import React, {useState, useEffect} from "react";
import { useOrderContext } from "./ContextApi/yourOrdersContextApi";
import { Accordion, Container, Row, Col, Table } from "react-bootstrap";


export default function CustomerOrders () {

    //Accessing the orders from "yourOrdersContextApi"
    const {yourOrders} = useOrderContext();
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    console.log(' i am in customer orders page')
    
    console.log("i am length" , yourOrders.length)

    console.log(yourOrders)

    return(
        <>
 <Container fluid>
      {/* Check if there are any orders */}
      {yourOrders.length > 0 ? (
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          {yourOrders.map((order, index) => (
            <Accordion.Item key={index} eventKey={String(index)}>
              {/* Accordion Header with Customer's Info */}
              <Accordion.Header>
               <strong>Order ID: {order.orderId} - {order.customerName} ({order.totalAmount} {order.currency || "INR"})</strong> <br /><br />
                
              </Accordion.Header>

              {/* Accordion Body displaying product details */}
              <Accordion.Body>
                {/* Order Summary */}
                <h5>Order Summary</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Price (₹)</th>
                      <th>Quantity</th>
                      <th>Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Loop over the products in each order */}
                    {order.products.map((product, productIndex) => (
                      <tr key={productIndex}>
                        <td>{productIndex + 1}</td>
                        <td>{product.productName}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {/* Additional Order Information */}
                <div className="order-info">
                  <p><strong>Order Status:</strong> {order.orderStatus}</p>
                  <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
                 
                  {/* Accessing paymentStatus from payment object */}
                  <p><strong>Payment Status:</strong> {order.payment.paymentStatus || "Not Available"}</p>
                  <strong>Delivery Address:</strong> {order.address.houseNo}, {order.address.street}, {order.address.city}, {order.address.district}, {order.address.state} <br />
                  <hr></hr>
                  <p>You can contact on following number to get details about your order: 8888888888</p>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <p>No orders found.</p>
      )}
    </Container>
        </>
    )
}