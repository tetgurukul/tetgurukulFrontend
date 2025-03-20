import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Receiving params from ProductSubCategory component
import { getProduct } from "../services/ProductService";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

// Using power of context api inside /components/ProductContextApi.js
import { useProductContext } from "./ContextApi/ProductContextApi";

// Importing cart&Checkout component
import CartAndCheckout from "../components/Cart&Checkout";

export default function Product() {
  // Destructuring params from ProductSubCategory component
  const { category, subcategory } = useParams();

  const [allProductData, setProductAllData] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(new Set()); // Keep track of added products to prevent re-adding

  const fetchProductData = async () => {
    try {
      const response = await getProduct();
      setProductAllData(response.data);
      console.log("Get product successfully executed");
      console.log(response.data);
    } catch (error) {
      console.log(`Error fetching products data ${error}`);
      console.log("Error occurred while getting products data.");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  // Filtering product data according to the category and subcategory selected by user and showing it on the product page
  const filteredProducts = allProductData.filter(
    (eachFilteredProduct) =>
      eachFilteredProduct.productCategory === category &&
      eachFilteredProduct.productSubName === subcategory
  );

  const { addProductArrayInContext } = useProductContext();
  const { productContext } = useProductContext();

  // Add product to the cart
  const addProductToCart = (productId) => {
    if (!addedToCart.has(productId)) {
      setAddedToCart(new Set(addedToCart.add(productId))); // Mark as added
      setCart((prevCart) => {
        const updatedCart = [...prevCart, productId];
        addProductArrayInContext(updatedCart); // Update context with the updated cart
        return updatedCart; // Return the updated cart state
      });
    }
  };

  // Count of products in the cart
  const countInCart = cart.length;

  return (
    <>
      <NavBar cartCount={countInCart} />
      <h1>I am product Listing page</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {filteredProducts.map((eachProduct) => {
          const isAdded = addedToCart.has(eachProduct._id); // Check if product is already in the cart
          return (
            <div key={eachProduct._id}>
              <Card style={{ width: "18rem" }} key={eachProduct._id}>
                <Card.Img variant="top" src={eachProduct.productImage} />
                <Card.Body>
                  <Card.Title>{eachProduct.productName}</Card.Title>
                  <Card.Text>{eachProduct.productNameDescription}</Card.Text>
                  <Card.Text>{`Rs. ${eachProduct.salePrice}`}</Card.Text>

                  {/* Show Add to Cart or Go to Cart button based on whether the product is added */}
                  {!isAdded ? (
                    <Button
                      id={eachProduct._id}
                      variant="primary"
                      onClick={() => addProductToCart(eachProduct._id)}
                    >
                      Add to cart
                    </Button>
                  ) : (
                    <Link to="/cart-checkout">
                      <Button variant="secondary">
                        Go to Cart
                      </Button>
                    </Link>
                  )}
                </Card.Body>
              </Card>
              <br></br>
            </div>
          );
        })}
      </div>

      {/* Below div is for when cart has some products in it */}
      <CartAndCheckout cartArray={cart} />
    </>
  );
}
