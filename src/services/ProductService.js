//Product Services
//Importing packages
import axios from "axios";

//const ApiUrl = "http://localhost:8050"

//Enviornment variable
const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

export const createProduct = async (formData) => {
    await axios.post(`${API_BASE_URL}/createProduct`, formData)
};

export const getProduct = async () => {
   const response =  await axios.get(`${API_BASE_URL}/getProduct`);
   return response.data;   
};

export const putProduct = async (_id, formData) => {
    const response = await axios.put(`${API_BASE_URL}/putProduct/${_id}`, formData);
    
};

export const deleteProduct = async (_id) => {
    const response = await axios.delete(`${API_BASE_URL}/deleteProduct/${_id}`);
};

export const getProductById = async (_id) => {
    const response = await axios.get(`${API_BASE_URL}/getProductById/${_id}`)
    return response.data;
}

//API to get product category only
export const getProductCategory = async () => {
    const response = await axios.get(`${API_BASE_URL}/getProductCategory`);
    return response.data;
}

//API to get product sub category only
export const subCategoryOfProduct = async () => {
    const response = await axios.get(`${API_BASE_URL}/getproductsubcategory`);
    return response.data;
}


//iF want to use modular exports so belof method is the example.

export default module = {getProduct}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^






//New apis below

//Below Apis are for productCategores from backend


export const createProductCategory = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/product-category`, formData)
    return response.data;
}




export const getProductCategories = async () => {
    const response =  await axios.get(`${API_BASE_URL}/product-categories`);
    return response.data;   
 };



 


export const updateProductCategory = async (productCategoryId, formData) => {
    console.log(`i am inside updateProductCategory service,`, productCategoryId)
    console.log(formData)
    const response = await axios.put(`${API_BASE_URL}/product-category/${productCategoryId}`,formData);
    return response.data;
} 

export const deleteProductCategory = async (productCategoryId) => {
    console.log('i am inside delete service api for product')
    const response = await axios.delete(`${API_BASE_URL}/product-category/${productCategoryId}`)
    return response.data;
}


export const getProductCategoryByProductId = async (productCategoryId) => {
    console.log("i am get product category by prduct id in product service");
    const response = await axios.get(`${API_BASE_URL}/product-category/${productCategoryId}`);
    return response.data;
}





 //Below Apis are for productSubCategories



 export const createProductSubcategory = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/product-subcategory`, formData)
    return response.data;
}


export const getProductSubcategories = async () => {
    const response = await axios.get(`${API_BASE_URL}/product-subcategories`);
    return response.data
}




 //API to get product sub category only
export const getProductSubcategory = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/product-subcategory/${id}`);
    return response.data;
}



export const deleteProductSubcategory = async (productSubCategoryId) => {

    console.log("i am inside product service subcateogry delete", productSubCategoryId)
    const response = await axios.delete(`${API_BASE_URL}/product-subcategory/${productSubCategoryId}`);
    return response.data;
}

export const updateProductSubcategory = async (productSubCategoryId, formData) => {
    console.log(`i am inside updateProductSubcategory service,`, productSubCategoryId)
    console.log(formData)
    const response = await axios.put(`${API_BASE_URL}/product-category/${productSubCategoryId}`,formData);
    return response.data;
}


export const getProductSubcategoryBySubId = async (productSubCategoryId) => {

    console.log('i am inside services for getProductSubcategoryBySubId', productSubCategoryId);
    const response = await axios.get(`${API_BASE_URL}/product-subcategory/${productSubCategoryId}`);
    return response.data;
}






//Below api for final products

export const getFinalProductById = async (productSubCategoryId) => {
    console.log(`i am inside serive: ${productSubCategoryId}`)
    const response = await axios.get(`${API_BASE_URL}/final-product/${productSubCategoryId}`);
    return response.data;
    
}


export const createFinalProduct =  async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/final-product`, formData)
    return response.data;
}

//Below api for prices



export const getPriceByProductId = async (productId) => {
    console.log(`i am inside serive: ${productId}`)
    const response = await axios.get(`${API_BASE_URL}/final-product/${productId}`);
    return response.data;
    
}




export const getPrices = async () => {
    console.log(`i am inside serive`)
    const response = await axios.get(`${API_BASE_URL}/prices`);
    return response.data;
    
}

