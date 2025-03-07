import React from "react";
import { createOrder, verifyPayment } from "../services/paymentServices";

const RazorpayCheckout = ({ orderId, amount }) => {
  
  const handlePayment = async () => {
    try {
      const orderData = await createOrder(orderId, amount);
      
      const options = {
        key: "rzp_test_vNUy5CyoqkDAdo", // Replace with your Razorpay key
        amount: orderData.amount * 100, // Razorpay expects amount in paisa
        currency: "INR",
        name: "Your Company",
        description: "Payment for Order",
        order_id: orderData.razorpayOrderId,
        handler: async (response) => {
          try {
            const paymentData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };
            
            const verifyResponse = await verifyPayment(paymentData);
            alert("Payment successful!");
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment failed!");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Payment initialization failed!");
    }
  };

  return <button onClick={handlePayment}>Pay ₹{amount}</button>;
};

export default RazorpayCheckout;
