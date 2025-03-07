//This shows the products sub category. Once a user clicks on any product from Proudct Listing, then they come here.

//Importing packages
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getProduct, subCategoryOfProduct } from "../services/ProductService";
import { Button, Card } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom"; //For passing product category, subcategory, and id to the Products component.


export function ProductSubCategory () {

    //Below id is coming from ProductListing.jsx by using useParmas and Lins featur of react.
    //I will use below feature to dynamically show only subcategory of those product clicked to buy on frontend.
    const {id} = useParams();

    // console.log(`below id is from useParams`)
    // console.log(id);

    //API call to get products data from db.

    //Below Hook stores all the active products Data.
      const [allProductData, setProductAllData] = useState([]);

      //Below Api fetches only subcategories product in db.
      //But in future i will create an optimise api which will just fetch...
      //...only the required data to show.
    
      const fetchProductData = async () => {
        try {
          const response = await subCategoryOfProduct();
          setProductAllData(response.data);
          console.log("Get product successfully executed");
          console.log(response.data);
        } catch (error) {
          console.log(`Error fetching products data ${error}`);
          console.log("Error occured while getting products data.");
        }
      };

      useEffect (() => {
        fetchProductData()
      }, [id])

   

      //Using below const we can only show those products whose id is equal to id that we are recieving form useParams.
        const filteredActiveProduct = allProductData.filter(eachAllProduct => eachAllProduct.productId === id)


    return (
        <div>
          <NavBar/>
            <p>I am Product Sub Category</p>
            <div 
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            justifyContent: "center",
            padding: "20px",}}
       
       >
        {filteredActiveProduct.map((eachProduct) => {
          return (
            <div
            key={eachProduct._id}
            >
              
              <Card style={{ width: "18rem" }} key={eachProduct._id}>
                <Card.Img variant="top" src={eachProduct.productSubImage} />
                <Card.Body>
                  <Card.Title>{eachProduct.productSubName}</Card.Title>
                  <Card.Text>
                    
                    {eachProduct.productCategoryDescription}
                  </Card.Text>
                  <Link to={`/products/${eachProduct.productCategory}/${eachProduct.productSubName}`}><Button variant="primary">CLICK TO SEE ITEMS</Button></Link>
                </Card.Body>
              </Card>
              <br></br>
            </div>
          );
        })}
      </div>

        </div>
    )
}