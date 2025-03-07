import React, {useState} from "react";
import ProductForm from "../components/ProductForm";
import ShowProduct from "../components/ShowProducts"
import PutProductForm from "../components/PutProduct";
import NavBar from "../components/NavBar";
import { ProductListing } from "../components/ProductListing";

export default function LandingPage () {

    return (
        <>
        <NavBar/>
        {/* <ProductForm/> */}
        {/* <ShowProduct/> */}
        <hr></hr>
        {/* <hr></hr>
        <br></br>
        <h1>Below is the product listing form component</h1>
        <hr></hr>
        <hr></hr> */}
        <ProductListing/>

        
        </>
    )
}