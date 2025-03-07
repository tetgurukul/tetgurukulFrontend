//This shows final products that is to be bought.

//Importing packages
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";//Recieiving params from ProductSubCategory component
import { getProduct } from "../services/ProductService";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Products () {

    //Destructuring params from ProductSubCategory comp
    const {category, subcategory} = useParams();

    // console.log(category)
    // console.log(subcategory)

    //Below api gets all the product data from the db and filters the data on fronten using useParams parameter.
    //I will optimise the API in future so that, data gets filtered in backend, and we won't need to make a load on frontend.

    //Below Hook stores all the active products Data.
      const [allProductData, setProductAllData] = useState([]);
    
      const fetchProductData = async () => {
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

      //
    
      useEffect((category,subcategory) => {
        fetchProductData();
      }, []);
    

   //Filtering product data according to the category and subcategory selected by user and showing it on product page.
   const filteredProducts = allProductData.filter(eachFilteredProduct => eachFilteredProduct.productCategory === category && eachFilteredProduct.productSubName === subcategory)
   //console.log(filteredProducts)
   //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    return (
        <>
        <NavBar/>
      <h1>I am prodcut Listing page</h1>
      <div 
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            justifyContent: "center",
            padding: "20px",}}
       
       >
        {filteredProducts.map((eachProduct) => {
          return (
            <div
            key={eachProduct._id}
            >
              
              <Card style={{ width: "18rem" }} key={eachProduct._id}>
                <Card.Img variant="top" src={eachProduct.productImage} />
                <Card.Body>
                  <Card.Title>{eachProduct.productName}</Card.Title>
                  <Card.Text>
                    
                    {eachProduct.productNameDescription}
                  </Card.Text>
                  {/* sending proudctId in params using useParams to the ProductSubCategory.jsx component */}
                  <Link to={""}><Button variant="primary">Add to cart</Button></Link> 
                </Card.Body>
              </Card>
              <br></br>
            </div>
          );
        })}
      </div>
    </>
    )
};