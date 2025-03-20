//This holds the add to cart items id.

//ProductContextApi

import React, { createContext, useContext, useState } from "react";

// Creating a context for managing the product array.
const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

// Provider component to wrap around the components that need access to the ProductContext.
export const ProductContextProvider = ({ children }) => {
  const [productContext, setProductContext] = useState([]);

  // Function to update the array in context.
  const addProductArrayInContext = (newArray) => {
    setProductContext(newArray);
  };

  return (
    <ProductContext.Provider value={{ productContext, addProductArrayInContext }}>
      {children}
    </ProductContext.Provider>
  );
};