//FRONTEND/src/components/ProductAdmin/EditAndDeleteSubCategoryForm.jsx;

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {
    getProductSubcategoryBySubId,
  updateProductSubcategory,
  getProductCategories,
} from '../../services/ProductService'; // Adjust paths as needed
import NavBar from '../NavBar';

const EditAndDeleteSubCategory = () => {
  const location = useLocation();
  const { productSubCategory_ID } = location.state || {};

  const [formData, setFormData] = useState({
    productSubCategoryId: '',
    productSubName: '',
    productCategory: '',
    aboutProductSubcategory: '',
    descriptionProductSubcategory: '',
    status: 'active',
  });

  const [productSubImage, setProductSubImage] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSubcategory = async () => {
        
      try {
        const response = await getProductSubcategoryBySubId(productSubCategory_ID);
        const sub = response.data[0]; // assuming response is an array
        console.log('i am response data', productSubCategory_ID)
        setFormData({
          productSubCategoryId: sub.productSubCategoryId || '',
          productSubName: sub.productSubName || '',
          productCategory: sub.productCategory || '',
          aboutProductSubcategory: sub.aboutProductSubcategory || '',
          descriptionProductSubcategory: sub.descriptionProductSubcategory || '',
          status: sub.status || 'active',
        });
      } catch (error) {
        setAlert({ type: 'danger', message: 'Failed to fetch subcategory data.' });
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getProductCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories.');
      }
    };

    if (productSubCategory_ID) {
      fetchSubcategory();
      fetchCategories();
    }
  }, [productSubCategory_ID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProductSubImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }
    if (productSubImage) {
      payload.append('productSubImage', productSubImage);
    }

    try {
      await updateProductSubcategory(productSubCategory_ID, payload);
      setAlert({ type: 'success', message: 'Product subcategory updated successfully!' });
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to update product subcategory.' });
    }
  };

  if (!formData.productSubCategoryId) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
        <nav>

            <NavBar/>

        </nav>
      <h2 className="mt-4">Update Product Subcategory</h2>
      {alert.message && (
        <Alert variant={alert.type} onClose={() => setAlert({ type: '', message: '' })} dismissible>
          {alert.message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Subcategory ID</Form.Label>
              <Form.Control
                type="text"
                name="productSubCategoryId"
                value={formData.productSubCategoryId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subcategory Name</Form.Label>
              <Form.Control
                type="text"
                name="productSubName"
                value={formData.productSubName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Parent Category</Form.Label>
              <Form.Select name="productCategory" value={formData.productCategory} onChange={handleChange}>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.productCategoryId}>
                    {cat.productCategoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>About Subcategory</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="aboutProductSubcategory"
                value={formData.aboutProductSubcategory}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descriptionProductSubcategory"
                value={formData.descriptionProductSubcategory}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subcategory Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Update Subcategory
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EditAndDeleteSubCategory;
