import React from "react";

const PaymentButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ padding: "10px 20px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
      Proceed to Pay
    </button>
  );
};

export default PaymentButton;
