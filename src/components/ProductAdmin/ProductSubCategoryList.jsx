// src/components/ProductAdmin/ProductSubcategoryList.jsx

import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getProductSubcategories, deleteProductSubcategory } from "../../services/ProductService";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";

const ProductSubcategoryList = () => {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);

  // Fetch subcategories on mount
  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await getProductSubcategories();
      setSubcategories(response.data);
      console.log("Subcategories fetched:", response.data);
    } catch (error) {
      console.error("Error fetching subcategories", error);
    }
  };

  // Delete subcategory
  const handleDelete = async (event) => {
    const subcategoryId = event.target.id;
    try {
      await deleteProductSubcategory(subcategoryId);
      document.getElementById(subcategoryId).remove();
      alert("Subcategory deleted successfully!");
    } catch (error) {
      console.error("Error deleting subcategory", error);
      alert("Failed to delete subcategory.");
    }
  };

  // Edit subcategory: navigate with ID
  const handleEdit = (event) => {
    const subcategoryId = event.target.id;
    navigate(`/edit-delete-subcategory`, {
      state: { productSubCategory_ID: subcategoryId },
    });
  };

  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <h1>All Product Subcategories</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Subcategory ID</th>
            <th>Name</th>
            <th>Parent Category</th>
            <th>About</th>
            <th>Description</th>
            <th>Status</th>
            <th>Image</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((sub) => (
            <tr id={sub._id} key={sub._id}>
              <td>{sub.productSubCategoryId}</td>
              <td>{sub.productSubName}</td>
              <td>{sub.productCategory}</td>
              <td>{sub.aboutProductSubcategory}</td>
              <td>{sub.descriptionProductSubcategory}</td>
              <td>{sub.status}</td>
              <td>
                <img
                  src={sub.productSubImage}
                  alt={sub.productSubName}
                  style={{ width: "50px" }}
                />
              </td>
              <td>
                <Button id={sub._id} variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </td>
              <td>
                <Button id={sub.productSubCategoryId} variant="warning" onClick={handleEdit}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductSubcategoryList;
