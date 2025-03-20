// Calls backend API inside customer service

import axios from "axios";

const API_BASE_URL = "http://localhost:8050/api/customers"; // Update with your backend URL

// Create a new customer
export const postCustomer = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Customer created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error.message);
    throw error;
  }
};

// Get all customers
export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error getting customers:", error.message);
    throw error;
  }
};

// Get a customer by ID
export const getCustomerById = async (customerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting customer by ID:", error.message);
    throw error;
  }
};

// Update a customer by ID
export const putCustomerById = async (customerId, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${customerId}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Customer updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error.message);
    throw error;
  }
};

// Delete a customer by ID
export const deleteCustomerById = async (customerId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${customerId}`);
    console.log("Customer deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error.message);
    throw error;
  }
};

// Get customer by phone number
export const getCustomerByPhone = async (phone) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/phone/${phone}`);
    return response.data;
  } catch (error) {
    console.error("Error getting customer by phone:", error.message);
    throw error;
  }
};