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