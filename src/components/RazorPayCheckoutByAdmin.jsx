import React, {useState, useEffect} from "react";
import { createOrder, verifyPayment } from "../services/paymentServices";
import { updatePaymentStatus } from "../services/orderServices";
import { useNavigate } from "react-router-dom";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

const RazorpayCheckoutByAdmin = ({ orderId, amount }) => {

    //Initializint useNavigate for conditional rendering
    const navigate = useNavigate();
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    //Below hook dynamically set the isPaid to true once the payment Status is updated in orders collections ind db

    // const [isPaid, setIsPaid] = useState(false)

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  
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
            alert("Payment successful yay!");
            console.log(`after successfull payment i am order id: ${orderId}`)

            let _id = orderId

            //Once the payment is done below Api updates the payment object, in orders collections.

            try {
                const updateResponse = await updatePaymentStatus(_id);
                if (updateResponse) {
                    navigate('/orders');
                  }
            } catch (error) {
                console.log('Eroor updating payment status', error)
            }

            

            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

           
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

export default RazorpayCheckoutByAdmin;
