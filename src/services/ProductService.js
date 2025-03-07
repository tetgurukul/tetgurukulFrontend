//Product Services
//Importing packages
import axios from "axios";

const ApiUrl = "http://localhost:8050"

export const createProduct = async (formData) => {
    await axios.post(`${ApiUrl}/api/createProduct`, formData)
};

export const getProduct = async () => {
   const response =  await axios.get(`${ApiUrl}/api/getProduct`);
   return response.data;   
};

export const putProduct = async (_id, formData) => {
    const response = await axios.put(`${ApiUrl}/api/putProduct/${_id}`, formData);
    
};

export const deleteProduct = async (_id) => {
    const response = await axios.delete(`${ApiUrl}/api/deleteProduct/${_id}`);
};

export const getProductById = async (_id) => {
    const response = await axios.get(`${ApiUrl}/api/getProductById/${_id}`)
    return response.data;
}

//API to get product category only
export const getProductCategory = async () => {
    const response = await axios.get(`${ApiUrl}/api/getProductCategory`);
    return response.data;
}

//API to get product sub category only
export const subCategoryOfProduct = async () => {
    const response = await axios.get(`${ApiUrl}/api/getproductsubcategory`);
    return response.data;
}


//iF want to use modular exports so belof method is the example.

export default module = {getProduct}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^