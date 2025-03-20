import React, { useState, useEffect } from "react";
import { getProduct } from "../services/ProductService";
import NavBar from "../components/NavBar";
import { useProductContext } from "./ContextApi/ProductContextApi";
import { Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CartAndCheckout() {
  const { addProductArrayInContext } = useProductContext();
  const { productContext } = useProductContext();

  const [productAllData, setProductAllData] = useState([]);

  const fetchPost = async () => {
    try {
      const response = await getProduct();
      setProductAllData(response.data);
      console.log("Get product successfully executed");
      console.log(response.data);
    } catch (error) {
      console.log(`Error fetching products data ${error}`);
      console.log("Error occured while getting products data.");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const filteredCartProducts = productAllData.filter((eachProduct) =>
    productContext.some((item) => item.product === eachProduct._id)
  );

  const productArrayCounter = productContext;
  console.log(productArrayCounter);

  // Increase the product count if user wants to buy same item on clicking on "+" sign.
  const addQuantity = (productId) => {
    const updatedProductContext = [...productContext];

    const product = updatedProductContext.find(
      (item) => item.product._id === productId
    );

    if (product) {
      if (product.count >= 3) {
        alert("Seller has a limit of 3 item per customer.");
      } else {
        product.count++;
      }
    } else {
      updatedProductContext.push({ product: productId, count: 1 });
    }

    addProductArrayInContext(updatedProductContext); // Trigger the re-render
  };

  const subtractQuantity = (productId) => {
    const updatedProductContext = [...productContext]; // Create a new array to trigger a re-render

    const productIndex = updatedProductContext.findIndex(
      (item) => item.product._id === productId
    );

    if (productIndex > -1) {
      const product = updatedProductContext[productIndex];

      // Only decrement if the count is greater than 1
      if (product.count > 1) {
        product.count--;
      } else {
        // If count is zero, remove the product from the cart
        updatedProductContext.splice(productIndex, 1);
      }
    }

    // Update the context with the modified cart array
    addProductArrayInContext(updatedProductContext); // Trigger the re-render
  };

  // Total Article counter:
  const totalArticleCount = productArrayCounter.reduce(
    (sum, item) => sum + item.count,
    0
  );
  console.log("I am counter of total Article");
  console.log(totalArticleCount);

  // Total Price Calculator (Using reduce Method).
  const totalArticlePrice = productContext.reduce(
    (acc, eachItem) => acc + eachItem.product.salePrice * eachItem.count,
    0
  );
  console.log(`totalArticle price is: ${totalArticlePrice}`);

  return (
    <Container fluid>
      <NavBar />
      <Row className="cehckout-div">
        <Col>
          {productContext.map((eachCartProduct, index) => {
            return (
              <div key={eachCartProduct.product._id} className="check-out-cards">
                <div className="card-image">
                  <img
                    src={eachCartProduct.product.productImage}
                    alt="Product image"
                  />
                  <br></br>

                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      border: "solid",
                      borderRadius: "10px",
                      width: "140px",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      id={eachCartProduct._id}
                      variant="primary"
                      onClick={() => {
                        addQuantity(eachCartProduct.product._id);
                      }}
                      style={{ background: "white", color: "black" }}
                    >
                      +
                    </Button>

                    <Button
                      id={eachCartProduct._id}
                      variant="primary"
                      onClick={() => subtractQuantity(eachCartProduct.product._id)}
                      style={{ background: "white", color: "black" }}
                    >
                      -
                    </Button>

                    {/* Show the count of this product */}
                    <div>{eachCartProduct.count}</div>
                  </div>
                </div>
                <div className="check-out-card-details">
                  <h3 className="product-name-in-cart">
                    {eachCartProduct.product.productName}
                  </h3>
                  <p className="product-description-in-cart">
                    {eachCartProduct.product.productNameDescription}
                  </p>
                  <p className="product-amount-in-cart">
                    {eachCartProduct.product.salePrice}
                  </p>
                </div>
              </div>
            );
          })}
        </Col>
        <Col className="item-summary-card" >
  <Row>
    <Col>
      <h3>Items Summary:</h3>
      <hr></hr>
      <p>Total Article: {totalArticleCount}</p>
      <p>Price Summary: </p>
      {productContext.map((eachCartProduct) => {
        return (
          <p className="product-info">
            <span className="product-name">
              {eachCartProduct.product.productName}
            </span>
            <span className="product-price">
              Rs. {eachCartProduct.product.salePrice * eachCartProduct.count}
            </span>
          </p>
        );
      })}
      <hr></hr>
      <h5>Total Price: Rs. {totalArticlePrice}</h5>
      <hr></hr>
      <Link to={"/customer-address"}>
        <Button className="buy-button">Click To Buy</Button>
      </Link>
    </Col>
  </Row>
</Col>
      </Row>
    </Container>
  );
}
