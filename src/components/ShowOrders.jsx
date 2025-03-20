//This component shows the orders data.
//Admin can see all the placed orders here and can assing delivery.

//importing packagesand files.
import React, {useState, useEffect} from "react";
import { getOrder } from "../services/orderServices";
import { Container, Accordion, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function ShowOrders () {

    // initialising useNavigate for dynamic rendering
    const navigate = useNavigate();

    //________________________________________

    //Below hooks to hold order values from db.
    const [allOrders, setAllOrders] = useState([]);

    //Api to get orders data from backend order.controllers.js api.
    const fetchOrders = async () => {
        const response = await getOrder();
        setAllOrders(response.data)



    }

    useEffect(()=> {
        fetchOrders()
        console.log(allOrders)
    }, []);

    //__________________________________________________________________________

    //Api handles the payment by admin or delivery partners

      // Handle payment function
  function handlePayment(orderId, amount) {
    // Navigate to the PaymentPage, passing orderId and finalAmount as state
    navigate("/paymentbyadmin", { state: { orderId, payableAmount: amount } });
  }


    //___________________________________________


    return (
        <>
         <Container fluid>
      {/* Check if there are any orders */}
      {allOrders.length > 0 ? (
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          {allOrders.map((order, index) => (
            <Accordion.Item key={index} eventKey={String(index)}>
              {/* Accordion Header with Order ID, Address, and Delivery Status */}
              <Accordion.Header>
                <div>
                  <strong>Order ID:</strong> {order.orderId} -{" "}
                  <strong>Customer:</strong> {order.customerName} <br />
                  <strong>Address:</strong> {order.address.houseNo}, {order.address.street}, {order.address.city}, {order.address.district}, {order.address.state} <br />
            
                  <strong>Delivery Status:</strong> {order.orderStatus}
                </div>
              </Accordion.Header>

              {/* Accordion Body displaying product details, payment status, and payment button */}
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

                  {/* Payment Status and Payment Mode */}
                  <p><strong>Payment Status:</strong> {order.payment.paymentStatus || "Not Available"}</p>
                  <p><strong>Payment Mode:</strong> {order.payment.paymentType || "Not Available"}</p>
                  <p><strong>Contact No.:</strong> {order.phone || "Not Available"}</p>
                  <p><strong>Alternate No.:</strong> {order.phone || "Not Available"}</p>
                  <hr />
                  
                  {/* If payment is not done, show the 'Pay Now' button */}
                  {order.payment.paymentStatus === "" && (
                    <Button variant="primary" onClick={() => handlePayment(order.orderId, order.finalAmount)}> {/*onClick={() => handlePayment(order.orderId)}*/ }
                      Pay Now
                    </Button>
                  )}
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