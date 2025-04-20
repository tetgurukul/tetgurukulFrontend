//src/components/ProductAdmin/CreateProductSubcategory.jsx


import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { createProductSubcategory, getProductCategories } from '../../services/ProductService'; // adjust if needed
import NavBar from '../NavBar';


const CreateProductSubcategory = () => {
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

  // Fetch available categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      
      try {
        const response = await getProductCategories();
        setCategories(response.data);
        console.log(response)
        console.log("i am categories", categories)

      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

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
      const response = await createProductSubcategory(payload);
      setAlert({ type: 'success', message: 'Product subcategory created successfully!' });

      // Reset form
      setFormData({
        productSubCategoryId: '',
        productSubName: '',
        productCategory: '',
        aboutProductSubcategory: '',
        descriptionProductSubcategory: '',
        status: 'active',
      });
      setProductSubImage(null);
    } catch (error) {
      setAlert({ type: 'danger', message: error.response?.data?.message || 'Something went wrong' });
    }
  };

  return (
    <Container fluid>
        <nav>
            <NavBar/>
        </nav>
      <h2 className="mt-4">Create Product Subcategory</h2>
      {alert.message && (
        <Alert variant={alert.type} onClose={() => setAlert({ type: '', message: '' })} dismissible>
          {alert.message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Col md={6}>

            
          <Form.Group controlId="productCategory" className="mb-3">
              <Form.Label>Parent Category</Form.Label>
              <Form.Select name="productCategory" value={formData.productCategory} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.productCategoryId} value={cat.productCategoryId}>
                    {cat.productCategoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>




            <Form.Group controlId="productSubCategoryId" className="mb-3">
              <Form.Label>Subcategory ID</Form.Label>
              <Form.Control
                type="text"
                name="productSubCategoryId"
                value={formData.productSubCategoryId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="productSubName" className="mb-3">
              <Form.Label>Subcategory Name</Form.Label>
              <Form.Control
                type="text"
                name="productSubName"
                value={formData.productSubName}
                onChange={handleChange}
                required
              />
            </Form.Group>

          </Col>

          <Col md={6}>
            <Form.Group controlId="productSubImage" className="mb-3">
              <Form.Label>Subcategory Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            </Form.Group>

            <Form.Group controlId="aboutProductSubcategory" className="mb-3">
              <Form.Label>About Subcategory</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="aboutProductSubcategory"
                value={formData.aboutProductSubcategory}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="descriptionProductSubcategory" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descriptionProductSubcategory"
                value={formData.descriptionProductSubcategory}
                onChange={handleChange}
              />
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
              Create Subcategory
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateProductSubcategory;
