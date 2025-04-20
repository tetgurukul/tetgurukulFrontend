//This functions shows the prdouct on the frontend listed by user.

//Importing packages.
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { getProduct, getProductCategory, getProductCategories } from "../services/ProductService";

//Using react-router-dom to pass product id to the ProductSubCategory component
import { Link } from "react-router-dom";

export function ProductListing() {
  //Below Hook stores all the active products Data.
  const [allProductData, setProductAllData] = useState([]);

  // const fetchProductData = async () => {
  //   try {
  //     const response = await getProductCategory();
  //     setProductAllData(response.data);
  //     console.log("Get product successfully executed");
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(`Error fetching products data ${error}`);
  //     console.log("Error occured while getting products data.");
  //   }
  // };



  const fetchProductData = async () => {
    try {
      const response = await getProductCategories();
      setProductAllData(response.data);
      console.log("Get product successfully executed");
      console.log(response.data);
    } catch (error) {
      console.log(`Error fetching products data ${error}`);
      console.log("Error occured while getting products data.");
    }
  };


  useEffect(() => {
    fetchProductData();
  }, []);

  //Using below const we can only show those products which are Active in db
//   const filteredActiveProduct = allProductData.filter(eachAllProduct => eachAllProduct.status === "Active")

  

  return (
    <>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {allProductData.map((eachProduct) => {
        return (
          <div key={eachProduct._id}>
            <Card className="productsCard" style={{ width: "18rem" }} key={eachProduct._id}>
              <Card.Img variant="top" src={eachProduct.productCategoryImage} 
              style={{ 
                height: '200px', 
                objectFit: 'contain' // or "cover" or "scale-down"
              }} 
              
              />
              <Card.Body>
                <Card.Title>{eachProduct.productCategoryName}</Card.Title>
                <Card.Text>
                  {eachProduct.descriptionProductCategory}
                </Card.Text>
                <Link to={`/productSubCategory/${eachProduct.productCategoryId}`}>
                  <Button variant="primary">CLICK TO SEE</Button>
                </Link>
              </Card.Body>
            </Card>
            <br />
          </div>
        );
      })}
    </div>
  </>
  );
}
