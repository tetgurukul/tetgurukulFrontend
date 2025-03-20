//Calls backend api inside ordercontroller.

import axios from "axios";

//const API_BASE_URL = "http://localhost:8050/api"; // Update with your backend URL

//Enviornment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const postOrder = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createorder`, data, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    console.log("Order created:", response.data);
  } catch (error) {
    console.error("Error posting order:", error.message);
  }
};


export const getOrderByOrderId = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getOrdersByOrderId/${orderId}`)
    return response.data;
  } catch (error) {
    console.error("Error occured getting order data by orderId: ", error.message);
  }
};


export const getOrderByPhoneNumber = async (phone) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getOrderByPhoneNumber/${phone}`)
    return response.data;
  } catch (error) {
    console.log("Error occured getting order data by phone number: ", error.message)
  }
}


//Api to get orders from backend api inside orders.controller.js.
export const getOrder = async () => {

  try {

    const response = await axios.get(`${API_BASE_URL}/getorder`)
    return response.data;
    
  } catch (error) {
    console.log("Error fetching orders data from db. Maybe server is not connected: ", error.message)
  }

}


//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Function to update an order by ID
export const putOrderById = async (_id, orderData) => {
  try {
    // Make a PUT request to the backend with the orderId and updated orderData
    const response = await axios.put(`${API_BASE_URL}/${_id}`, orderData);

    // Return the response data on successful update
    return response.data;
  } catch (error) {
    // Handle errors (e.g., network errors or backend errors)
    console.error("Error updating order:", error);
    throw new Error("Failed to update order");
  }
};

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Frontend service to update payment status
export const updatePaymentStatus = async (_id) => {
  try {
    // Send the _id in the URL, not in the body
    const response = await axios.put(`${API_BASE_URL}/updatePaymentStatus/${_id}`);
    return response.data;
  } catch (error) {
    console.log("Some error occurred while updating payment status", error.message);
  }
}