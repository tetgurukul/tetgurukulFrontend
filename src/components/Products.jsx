//This shows final products that is to be bought.

//Importing packages
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; //Recieiving params from ProductSubCategory component
import { getProduct, getFinalProductById, getPriceByProductId, getPrices } from "../services/ProductService";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

//Using power of context api inside /components/ProductContextApi.js
import { useProductContext } from "./ContextApi/ProductContextApi";

//Importing cart&Checkout component
import CartAndCheckout from "../components/Cart&Checkout";

export default function Products() {

  //Initializing useNavigate for conditional rendering.
    const navigate = useNavigate();

  //______________________________________________________


  //Destructuring params from ProductSubCategory comp
  const { productCategory, productSubCategoryId } = useParams();

  //Below api gets all the product data from the db and filters the data on fronten using useParams parameter.
  //I will optimise the API in future so that, data gets filtered in backend, and we won't need to make a load on frontend.

  //Below Hook stores all the active products Data.
  const [allProductData, setProductAllData] = useState([]);
  const [allPriceData, setAllPriceData] = useState([]);

  //if cart is not empty(which is false), then Cart&Checkout component gets activated
  // and when user clicks on cart button then this sets to false.
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  // const fetchProductData = async () => {


  //   try {
  //     const response = await getProduct();
  //     setProductAllData(response.data);
  //     // console.log("Get product successfully executed");
  //     // console.log(response.data);
  //   } catch (error) {
  //     console.log(`Error fetching products data ${error}`);
  //     console.log("Error occured while getting products data.");
  //   }
  // };

  console.log('position')
  console.log(productCategory)
  console.log(productSubCategoryId)

  const fetchProductData = async (productSubCategoryId) => {
    console.log("i am product subcategory id", productSubCategoryId)

    try {
      const response = await getFinalProductById(productSubCategoryId);
      setProductAllData(response.data);
      // console.log("Get product successfully executed");

     console.log(response.data);
    } catch (error) {
      console.log(`Error fetching products data ${error}`);
      console.log("Error occured while getting products data.");
    }
  };

  

  useEffect(() => {
    fetchProductData(productSubCategoryId);  // Pass the productSubCategoryId here
  }, [productSubCategoryId]);  // Add productSubCategoryId as a dependency to trigger the effect when it changes
  
//_________________________________________________

//below api fetches all the price array from the db
const fetchPriceData = async () => {


  try {
    const response = await getPrices();
    setAllPriceData(response.data);
    console.log("Get price successfully executed");
    console.log(response.data)

   console.log(response.data);
  } catch (error) {
    console.log(`Error fetching products data ${error}`);
    console.log("Error occured while getting price product data.");
  }
};
  
useEffect(() =>{
 fetchPriceData()
}, [])




// Merging the two arrays based on the `productId`
const mergedProducts = allPriceData.map((pricing) => {
  const detail = allProductData.find((product) => product.productId === pricing.productId);
  if (detail) {
    return { ...pricing, ...detail }; // Combine both objects
  }
  return null;
}).filter(product => product !== null); // Remove any null values if no match is found

console.log(mergedProducts);


//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^











  //Filtering product data according to the category and subcategory selected by user and showing it on product page.
  const filteredProducts = allProductData.filter(
    (eachFilteredProduct) =>
      eachFilteredProduct.productSubCategoryId === productSubCategoryId &&
      eachFilteredProduct.productSubCategoryId === productSubCategoryId
  );
  //console.log(filteredProducts)
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //Context API inside /components/ProductContextApi.js
  const { addProductArrayInContext } = useProductContext();
  const { productContext } = useProductContext();

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //Adds productId to array using addProductToCart.
  //When user clicks on Add to card button, it sends the id in an array created in below funciton

  // const [cartArray, setCartArray] = useState([]);

  /*
  const addProductToCart = (productId) =>{ 

    // Copy the current cart array to prevent mutation (for context api)
      const cart = [...productContext];

    // Check if the productId already exists in the array
    const product = cart.find(item => item.product === productId);

    if (product) {
        // If the productId is found, increment the count
        product.count++;
    } else {
        // If the productId doesn't exist, add it to the array with a count of 1
        cart.push({product:productId, count: 1})
    }

     // Update the context with the modified cart array
      //  setCartArray(cart);
      addProductArrayInContext(cart);

    // console.log('i am context api cart below')
    console.log(cart)
}

*/

  const addProductToCart = (productId) => {
    // Get the full product data based on productId
    const product = mergedProducts.find((item) => item._id === productId); // Assuming `filteredProducts` has all products available.

    if (!product) return; // If the product is not found, exit

    // Copy the current cart array to prevent mutation (for context api)
    const updatedCart = [...productContext];

    // Check if the product already exists in the cart (based on product ID)
    const existingProduct = updatedCart.find(
      (item) => item.product._id === productId
    );

    if (existingProduct) {
      // If the product already exists in the cart, increment the count
      existingProduct.count++;
    } else {
      // If the product doesn't exist, add it to the cart
      updatedCart.push({ product, count: 1 });
    }

    // Update the context with the modified cart array
    addProductArrayInContext(updatedCart);

    // Log for debugging
    console.log('i am add cart')
    console.log(updatedCart);
  };

  // const [cart, setCart] = useState([]);

  // const addProductToCart = (productId) => {
  //   setCart((prevCart) => {
  //     const updatedCart = [...prevCart, productId];
  //     addProductArrayInContext(updatedCart); // Update context with the updated cart
  //     return updatedCart; // Return the updated cart state
  //   });
  // };

  //Shows count of products in the cart.
  //1 It counts the product unq id's in the cart.
  //2 And passes as a prop to navbar.
  //3 Where the count will be shown in the cart
  // const countInCart = cart.length;

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  const handleGotoCart = () => {
    navigate('/cart-checkout')
    
  }
  
  console.log("i am merged product", mergedProducts, allProductData)

  return (
    <>
      <NavBar cartCount={"cartArray"} />
      <h1></h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {mergedProducts.map((eachProduct) => {
          return (
            <div  key={eachProduct._id}>
              <Card style={{ width: "18rem" }} key={eachProduct._id}>
                <Card.Img variant="top" src={eachProduct.productImage} 
                
                style={{ 
                  height: '200px', 
                  objectFit: 'contain' // or "cover" or "scale-down"
                }} 
                
                
                
                />
                <Card.Body>
                  <Card.Title>{eachProduct.productName}</Card.Title>
                  <Card.Text>{eachProduct.productNameDescription}</Card.Text>
                  <Card.Text>{`Rs. ${eachProduct.salePrice}`}</Card.Text>
                  {/* sending proudctId in params using useParams to the ProductSubCategory.jsx component */}
                  {productContext.some(
                    (item) => item.product._id === eachProduct._id
                  ) ? (
                    <>
                      <Button
                        id={eachProduct._id}
                        variant="primary"
                        onClick={() => addProductToCart(eachProduct._id)}
                        disabled
                      >
                        Add to cart
                      </Button>
                      <br></br>
                      <br></br>
                      <Button onClick={handleGotoCart}>Go to Cart</Button>
                    </>
                  ) : (
                    <Button
                      id={eachProduct._id}
                      variant="primary"
                      onClick={() => addProductToCart(eachProduct._id)}
                    >
                      Add to cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
              <br></br>
            </div>
          );
        })}
      </div>

      {/* below div is for when cart has some products in it */}
      {/* <CartAndCheckout /> */}
    </>
  );
}
