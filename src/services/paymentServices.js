//Payment service calls backend api.
import axios from "axios";

//const API_BASE_URL = "http://localhost:8050/api/payments"; // Update with your backend URL


//Enviornment variable
const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/payments`;


export const createOrder = async (orderId, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createorder`, {
      orderId,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verifypayment`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};