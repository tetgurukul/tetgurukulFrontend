import React, { useState } from "react";
import RazorpayCheckout from "../components/RazorpayCheckout";
import RazorpayPayment from "../components/RazorpayPayment";

const PaymentPage = () => {
  const [amount, setAmount] = useState(500); // Replace with dynamic amount
  const orderId = "67c2b424fa447f72d443780f"; // Replace with dynamic order ID from backend

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Total Amount: ₹{amount}</h2>
      <RazorpayCheckout orderId={orderId} amount={amount} />
    </div>
  );
};

export default PaymentPage;
