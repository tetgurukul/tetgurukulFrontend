//Showing products in admin panel for updating or deleting.

//Importing packages.
import React, {useState, useEffect} from "react";
import {Table, Button, } from "react-bootstrap";
import { getProduct, deleteProduct } from "../services/ProductService";
import PutProductForm from "./PutProduct";
import { Link, useNavigate } from "react-router-dom"; //Using useNavigate we will pass the product id to the other components, like, PutProduct


 function GetProduct () {

    const navigate = useNavigate();

    const [productAllData, setProductAllData] = useState([]);





        const fetchPost = async () => {
          try {
            const response = await getProduct();
            setProductAllData(response.data);
            console.log("Get product successfully executed");
            console.log(response.data)
          } catch (error) {
            console.log(`Error fetching products data ${error}`);
            console.log('Error occured while getting products data.')
          }
        };
        
    
       
    
    useEffect(() => {
        fetchPost();
    }, [])

    
    
    //Function to handle Edit Button in the form...
    //This edit button edits the data in the db. If user wants to edit any...
    //...details of a product so it can be edited from this edit button.
      async function handleDeleteProduct(event){

        // alert(`My product id is: ${event.target.id}`)
        // console.log(event.target.id)
        // console.log(event)
          
          //Below api uses the calls delete api from backend.
          const response = await deleteProduct(event.target.id)
          //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

          //Removing the table row affter deleting it
          const removeRow = await document.getElementById(event.target.id).remove();

          alert(`Product Successfully deleted`);
          //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
      }
      
          //Below Function handles the edit process of the Product data
          //We store the product id in a variabel productIdfromDb and sends it to using...
          //...useNavigate router-dom functioanlaity to the component of PutProduct...
          //...Then we can show prefilled form using this id on that component, this id can be...
          //...used in calling getProductById api using this id

          const [product_id, setProduct_id] = useState("");
     
          async function handleEditProduct (event) {
            // alert(`i am product id: ${event.target.id}`);
            setProduct_id(event.target.id);
            const productIdfromDb = event.target.id;


            //passing the product id using useNavigate to PutProduct component as a state.
            //In other component we can fetch this id using useLocation
            navigate(`/putProduct`, {
              state: {product_ID: productIdfromDb}
            });
            
          };
         
          console.log('I am product_id')
          console.log(product_id)

          

          

      
    
    return (
        <div>
            <h1>Hello from Show Product</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Product Image</th>
                  <th>Product Sub Name</th>
                  <th>Product Sub Image</th>
                  <th>Product Category</th>
                  <th>Product Category Image</th>
                  <th>Product Name Description</th>
                  <th>Product Sub Name Description</th>
                  <th>Product Category Description</th>
                  <th>Product Meta Title</th>
                  <th>Product meta Description</th>
                  <th>Slug</th>
                  <th>Delete Product</th>
                  <th>Edit Content</th>
                  

                </tr>
                </thead>
                <tbody>
                  {productAllData.map((eachProduct) => {
                    return (
                    <tr id={eachProduct._id} key={eachProduct.productId} >
                      <td >{eachProduct.productId}</td>
                      <td >{eachProduct.productName}</td>
                      <td>{eachProduct.productImage}</td>
                      <td>{eachProduct.productSubName}</td>
                      <td>{eachProduct.productSubImage}</td>
                      <td>{eachProduct.productCategory}</td>
                      <td>{eachProduct.ptroductCategoryImage}</td>
                      <td>{eachProduct.productNameDescription}</td>
                      <td>{eachProduct.productSubNameDescription}</td>
                      <td>{eachProduct.productCategoryDescription}</td>
                      <td>{eachProduct.metaTitle}</td>
                      <td>{eachProduct.metaDescription}</td>
                      <td>{eachProduct.slug}</td>
                      <td><Button
                            id={eachProduct._id}
                            onClick={(event)=> handleDeleteProduct(event)}
                      >Dlete</Button></td>
                      <td><Link to={`/putProduct/${product_id}`}></Link><Button id={eachProduct._id} onClick={(event) => handleEditProduct(event)}>Edit Product</Button></td>
                    </tr>
                  )})}
                </tbody>
              
            </Table>

          
        </div>
    )
}


export default GetProduct;

