import React from "react";
import { createOrder, verifyPayment } from "../services/paymentServices";
import { updatePaymentStatus } from "../services/orderServices";
import { useNavigate } from "react-router-dom";

const RazorpayCheckout = ({ orderId, amount }) => {


    //Initializint useNavigate for conditional rendering
      const navigate = useNavigate();
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  
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
            console.log(`after successfull payment i am order id: ${orderId}`)

            let _id = orderId

            //Once the payment is done below Api updates the payment object, in orders collections.

            // const updateResponse = await updatePaymentStatus(_id);

            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

            //Once the payment is done below Api updates the payment object, in orders collections.

            try {
                const updateResponse = await updatePaymentStatus(_id);
                if (updateResponse) {
                    navigate('/order-confirmation');
                  }
            } catch (error) {
                console.log('Eroor updating payment status', error)
            }



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
