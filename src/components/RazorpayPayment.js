import { useEffect } from "react";

const RazorpayPayment = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div>Razorpay Checkout</div>;
};

export default RazorpayPayment;
