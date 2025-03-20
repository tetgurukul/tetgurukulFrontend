import React, { useEffect, useState } from "react";
import RazorpayCheckoutByAdmin from "../components/RazorPayCheckoutByAdmin";
import { useLocation } from "react-router-dom";  // Import useLocation
import { getOrderByOrderId } from "../services/orderServices";

const PaymentPageByAdmin = () => {
  const [customerOrderObject, setCustomerOrderObject] = useState(null); // Initially null
  const [amount, setAmount] = useState(0); // Initially 0
  const [loading, setLoading] = useState(true); // Track loading state

  // Get the orderId and payableAmount from location state
  const location = useLocation();
  const finalAmount = location.state?.payableAmount || 0; // Default to 0 if not passed
  const orderId = location.state?.orderId; // Ensure orderId is passed correctly

  console.log(`Final Amount: ₹${finalAmount}`);
  console.log(`Order ID: ${orderId}`);

  // Fetch the order data based on the orderId
  const fetchOrderData = async () => {
    if (orderId) {
      try {
        setLoading(true); // Set loading state to true
        const response = await getOrderByOrderId(orderId);
        setCustomerOrderObject(response.data); // Store the response data
        setAmount(response.data.amount); // Assuming the amount is in response.data.amount
        console.log(`Customer Order Object from Payment Page: `, response.data);
      } catch (error) {
        console.error("Error occurred while fetching order object data:", error);
      } finally {
        setLoading(false); // Set loading state to false once data is fetched
      }
    } else {
      console.error("Order ID is missing");
      setLoading(false); // Stop loading if orderId is missing
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderData();
    }
  }, [orderId]);

  // If still loading, show a loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // Once data is fetched, we can access the orderObjectId
  const orderObjectId = customerOrderObject?._id;

  console.log(`I am final orderObject Id: ${orderObjectId}`);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Total Amount: ₹{amount || finalAmount}</h2>
      {orderObjectId && <RazorpayCheckoutByAdmin orderId={orderObjectId} amount={amount || finalAmount} />}
    </div>
  );
};

export default PaymentPageByAdmin;
