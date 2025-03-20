import React, { createContext, useState, useContext, useEffect } from 'react';

// Creating context for the orders.
const OrderContext = createContext();

// Creating a provider component.
export const OrderProvider = ({ children }) => {
  // Initially try to get orders from localStorage
  const savedOrders = localStorage.getItem('yourOrders');
  const initialOrders = savedOrders ? JSON.parse(savedOrders) : [];

  // Initialize state with localStorage data (or empty array if none found)
  const [yourOrders, setYourOrders] = useState(initialOrders);

  // Update localStorage whenever the orders change
  useEffect(() => {
    if (yourOrders.length > 0) {
      localStorage.setItem('yourOrders', JSON.stringify(yourOrders));
    }
  }, [yourOrders]);

  // Function to update the orders
  const updateOrders = (orders) => {
    setYourOrders(orders);
  };

  return (
    <OrderContext.Provider value={{ yourOrders, updateOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the OrderContext
export const useOrderContext = () => {
  return useContext(OrderContext);
};
