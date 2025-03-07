//This is the form which will allow admin to update any product in database.

//Importing important packages
import React, {useState, useEffect} from "react";
import {Table, Row, Col, Button, Form} from "react-bootstrap";
import ProdcutService, { putProduct } from "../services/ProductService.js";
import { createProduct, getProductById} from "../services/ProductService.js";

//Importing React-Router-Dom useParams which is taking id as params coming from ShowProduct Component.
import { useParams, useLocation } from "react-router-dom";

function PutProductForm () {

    //Below product_id is coming from ShowProduct component.
    //We used useNavigate method to pass the state id of the product and here using useLovation to fetch the product id coming from ShowProductComponent
    const location = useLocation();
    const {product_ID} =  location.state || {};
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    
    // console.log("I am from putproduct and below me should be id coming from other component")
    // console.log(product_ID);
    




    //Below hook stores the product data fetch by it's id.
    const [allProductData, setAllProductData]= useState([]) //Stores the data coming from getProductById api.


    //Below hooks for updating the data of the product;

        const [productId, setProductId] = useState("");
        const [productName, setProductName] = useState("");
        const [productImage, setProductImage] = useState(null);
        const [productSubName, setProductSubName] = useState("");
        const [productSubImage, setProductSubImage] = useState(null);
        const [productCategory, setProductCategory] = useState("");
        const [productCategoryImage, setProductCategoryImage] = useState(null);
        const [price, setPrice] = useState("");
        const [tax, setTax] = useState("");
        const [shippingCharges, setShippingCharges] = useState("");
        const [deliveryCharges, setDeliveryCharges] = useState("");
        const [salePrice, setSalePrice] = useState("");
        const [productNameDescription, setProductNameDescription] = useState("");
        const [productSubNameDescription, setProductSubNameDescription] = useState("");
        const [productCategoryDescription, setProductCategoryDescription] = useState("");
        const [inStock, setInStock] = useState("");
        const [stockCount, setStockCount] = useState("");
        const [productCreationDate, setProductCreationDate] = useState("");
        const [author, setAuthor] = useState("");
        const [publisher, setPublisher] = useState("");
        const [ISBN, setISBN] = useState("");
        const [publicationDate, setPublicationDate] = useState("");
        const [edition, setEdition] = useState("");
        const [format, setFormat] = useState("");
        const [ratings, setRatings] = useState("");
        const [discountPercentage, setDiscountPercentage] = useState("");
        const [status, setStatus] = useState("");
        const [metaTitle, setMetaTitle] = useState("");
        const [metaDescription, setMetaDescription] = useState("");
        const [slug, setSlug] = useState("");
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    

    

    //I will fetch the data from Products from the Backend. And updates all the hooks to show the prefilled value in form.
    //Using getProduct service from ProductService.js file inside services folder.
    const fetchProductData = async () => {
        try {
            const response = await getProductById(product_ID);
            setAllProductData(response.data)
            console.log("I am in the try block from PutProduct component")
            console.log(response.data)
            console.log(response.data.productId)
           
        } catch (error) {
            console.error(error)
        }
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    //Below Block set the state hooks value to be shonw in prefilled form.

    useEffect(()=>{

      setProductId(allProductData.productId || "");  
      setProductName(allProductData.productName || "");  
      setProductImage(allProductData.productImage || null);  
      setProductSubName(allProductData.productSubName || "");  
      setProductSubImage(allProductData.productSubImage || null);  
      setProductCategory(allProductData.productCategory || "");  
      setProductCategoryImage(allProductData.productCategoryImage || null);  
      setPrice(allProductData.price || "");  
      setTax(allProductData.tax || "");  
      setShippingCharges(allProductData.shippingCharges || "");  
      setDeliveryCharges(allProductData.deliveryCharges || "");  
      setSalePrice(allProductData.salePrice || "");  
      setProductNameDescription(allProductData.productNameDescription || "");  
      setProductSubNameDescription(allProductData.productSubNameDescription || "");  
      setProductCategoryDescription(allProductData.productCategoryDescription || "");  
      setInStock(allProductData.inStock || "");  
      setStockCount(allProductData.stockCount || "");  
      setProductCreationDate(allProductData.productCreationDate || "");  
      setAuthor(allProductData.author || "");  
      setPublisher(allProductData.publisher || "");  
      setISBN(allProductData.ISBN || "");  
      setPublicationDate(allProductData.publicationDate || "");  
      setEdition(allProductData.edition || "");  
      setFormat(allProductData.format || "");  
      setRatings(allProductData.ratings || "");  
      setDiscountPercentage(allProductData.discountPercentage || "");  
      setStatus(allProductData.status || "");  
      setMetaTitle(allProductData.metaTitle || "");  
      setMetaDescription(allProductData.metaDescription || "");  
      setSlug(allProductData.slug || "");  






    }, [allProductData])

   

    //Below API updates the data of Product schema in db.

    const handleSubmit = async (e) => {
    
            e.preventDefault();
            const formData = new FormData();
            formData.append("productId", productId);
            formData.append("productName", productName);
            formData.append("productImage", productImage || "");
            formData.append("productSubName", productSubName);
            formData.append("productSubImage", productSubImage || "");
            formData.append("productCategory", productCategory);
            formData.append("productCategoryImage", productCategoryImage || "");
            formData.append("price", parseInt(price));
            formData.append("tax", parseInt(tax));
            formData.append("shippingCharges", parseInt(shippingCharges));
            formData.append("deliveryCharges", parseInt(deliveryCharges));
            formData.append("salePrice", parseInt(salePrice));
            formData.append("productNameDescription", productNameDescription);
            formData.append("productSubNameDescription", productSubNameDescription);
            formData.append("productCategoryDescription", productCategoryDescription);
            //formData.append("inStock", inStock);
            formData.append("stockCount", parseInt(stockCount));
            formData.append("productCreationDate", new Date(productCreationDate).toISOString());
            formData.append("author", author);
            formData.append("publisher", publisher);
            formData.append("ISBN", ISBN);
            formData.append("publicationDate", new Date(publicationDate).toISOString());
            formData.append("edition", edition);
            formData.append("format", format);
            formData.append("ratings", ratings);
            formData.append("discountPercentage", discountPercentage);
            formData.append("status", status);
            formData.append("metaTitle", metaTitle);
            formData.append("metaDescription", metaDescription);
            formData.append("slug", slug);

            let _id = product_ID
            await putProduct(_id, formData);
    
            setProductId("");
            setProductName("");
            setProductImage(null);
            setProductSubName("");
            setProductSubImage(null);
            setProductCategory("");
            setProductCategoryImage(null);
            setPrice("");
            setTax("");
            setShippingCharges("");
            setDeliveryCharges("");
            setSalePrice("");
            setProductNameDescription("");
            setProductSubNameDescription("");
            setProductCategoryDescription("");
            //setInStock("");
            setStockCount("");
            setProductCreationDate("");
            setAuthor("");
            setPublisher("");
            setISBN("");
            setPublicationDate("");
            setEdition("");
            setFormat("");
            setRatings("");
            setDiscountPercentage("");
            setStatus("");
            setMetaTitle("");
            setMetaDescription("");
            setSlug("");
    
            e.target.reset();
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   

   

    useEffect(()=> {
        fetchProductData()
    }, [])


    return (

        <div>
      <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Set Product ID</Form.Label>
        <Form.Control type="text" value={productId} onChange={(e) => setProductId(e.target.value)} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Product Image</Form.Label>
        <Form.Control type="file" onChange={(e) => setProductImage(e.target.files[0])} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Product Sub-name</Form.Label>
        <Form.Control type="text" valule={productSubName} onChange={(e) => setProductSubName(e.target.value) }required/>
      </Form.Group>

        <Form.Group>
        <Form.Label>Product Sub Image</Form.Label>
        <Form.Control type="file" onChange={(e) => setProductSubImage(e.target.files[0])} />
        </Form.Group>

        <Form.Group>
        <Form.Label>Product Category</Form.Label>
        <Form.Control type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Product Category Image</Form.Label>
        <Form.Control type="file" onChange={(e) => setProductCategoryImage(e.target.files[0])} />
        </Form.Group>

        <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Tax</Form.Label>
        <Form.Control type="number" value={tax} onChange={(e) => setTax(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Shipping Charges</Form.Label>
        <Form.Control type="number" value={shippingCharges} onChange={(e) => setShippingCharges(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Delivery Charges</Form.Label>
        <Form.Control type="number" value={deliveryCharges} onChange={(e) => setDeliveryCharges(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Sale Price</Form.Label>
        <Form.Control type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Product Name Description</Form.Label>
        <Form.Control type="text" value={productNameDescription} onChange={(e) => setProductNameDescription(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Product Sub Name Description</Form.Label>
        <Form.Control type="text" value={productSubNameDescription} onChange={(e) => setProductSubNameDescription(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Product Category Description</Form.Label>
        <Form.Control type="text" value={productCategoryDescription} onChange={(e) => setProductCategoryDescription(e.target.value)} required />
        </Form.Group>

        {/* <Form.Group>
        <Form.Label>In Stock</Form.Label>
        <Form.Control type="text" value={inStock} onChange={(e) => setInStock(e.target.value)} required />
        </Form.Group> */}

        <Form.Group>
        <Form.Label>Stock Count</Form.Label>
        <Form.Control type="number" value={stockCount} onChange={(e) => setStockCount(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Product Creation Date</Form.Label>
        <Form.Control type="date" value={productCreationDate} onChange={(e) => setProductCreationDate(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Publisher</Form.Label>
        <Form.Control type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>ISBN</Form.Label>
        <Form.Control type="text" value={ISBN} onChange={(e) => setISBN(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Publication Date</Form.Label>
        <Form.Control type="date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Edition</Form.Label>
        <Form.Control type="text" value={edition} onChange={(e) => setEdition(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Format</Form.Label>
        <Form.Control type="text" value={format} onChange={(e) => setFormat(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Ratings</Form.Label>
        <Form.Control type="text" value={ratings} onChange={(e) => setRatings(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Discount Percentage</Form.Label>
        <Form.Control type="text" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Meta Title</Form.Label>
        <Form.Control type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Meta Description</Form.Label>
        <Form.Control type="text" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} required />
        </Form.Group>

        <Form.Group>
        <Form.Label>Slug</Form.Label>
        <Form.Control type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </Form.Group>


      <Button variant="primary" type="submit">Add Product</Button>
    </Form>
    </div>

        
    )
}


export default PutProductForm;