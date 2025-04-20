//FRONTEND/src/components/ProductAdmin/CreateProductCategory.jsx;

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { createProductCategory } from '../../services/ProductService'; // Adjust the path as needed

const CreateProductCategory = () => {
  const [formData, setFormData] = useState({
    productCategoryId: '',
    productCategoryName: '',
    aboutProductCategory: '',
    descriptionProductCategory: '',
    status: 'active',
  });

  const [productCategoryImage, setProductCategoryImage] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProductCategoryImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    if (productCategoryImage) {
        payload.append('productCategoryImage', productCategoryImage); // 
      }

    try {
      const response = await createProductCategory(payload);
      setAlert({ type: 'success', message: 'Product category created successfully!' });
      setFormData({
        productCategoryId: '',
        productCategoryName: '',
        aboutProductCategory: '',
        descriptionProductCategory: '',
        status: 'active',
      });
      setProductCategoryImage(null);
    } catch (error) {
      setAlert({ type: 'danger', message: error.response?.data?.message || 'Something went wrong' });
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Create Product Category</h2>
      {alert.message && (
        <Alert variant={alert.type} onClose={() => setAlert({ type: '', message: '' })} dismissible>
          {alert.message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Col md={6}>
            <Form.Group controlId="productCategoryId" className="mb-3">
              <Form.Label>Product Category ID</Form.Label>
              <Form.Control
                type="text"
                name="productCategoryId"
                value={formData.productCategoryId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="productCategoryName" className="mb-3">
              <Form.Label>Product Category Name</Form.Label>
              <Form.Control
                type="text"
                name="productCategoryName"
                value={formData.productCategoryName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="aboutProductCategory" className="mb-3">
              <Form.Label>About Product Category</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="aboutProductCategory"
                value={formData.aboutProductCategory}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="descriptionProductCategory" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descriptionProductCategory"
                value={formData.descriptionProductCategory}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="productCategoryImage" className="mb-3">
              <Form.Label>Product Category Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            </Form.Group>

            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Create Category
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateProductCategory;
