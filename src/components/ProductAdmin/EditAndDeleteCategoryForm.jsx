//FRONTEND/src/components/ProductAdmin/EditAndDeleteCategoryForm.jsx;
// FRONTEND/src/components/ProductAdmin/PutProductCategoryForm.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getProductCategoryById, updateProductCategory, getProductCategoryByProductId } from '../../services/ProductService'; // Adjust paths

const EditAndDeleteCategory = () => {
  const location = useLocation();
  const { productCategory_ID } = location.state || {};

  const [productCategoryData, setProductCategoryData] = useState([]);
  const [formData, setFormData] = useState({
    productCategoryId: '',
    productCategoryName: '',
    aboutProductCategory: '',
    descriptionProductCategory: '',
    status: 'active',
  });

  const [productCategoryImage, setProductCategoryImage] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    console.log('I am in the edit component and product ID is', productCategory_ID);

    const fetchData = async () => {
      try {
        const response = await getProductCategoryByProductId(productCategory_ID);
        const data = response.data;

        console.log('Fetched data:', data);

        if (data && data.length > 0) {
          const productCategory = data[0];

          setProductCategoryData(data);

          setFormData({
            productCategoryId: productCategory.productCategoryId || '',
            productCategoryName: productCategory.productCategoryName || '',
            aboutProductCategory: productCategory.aboutProductCategory || '',
            descriptionProductCategory: productCategory.descriptionProductCategory || '',
            status: productCategory.status || 'active',
          });
        }
      } catch (error) {
        setAlert({ type: 'danger', message: 'Failed to fetch product category data.' });
      }
    };

    if (productCategory_ID) {
      fetchData();
    }
  }, [productCategory_ID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProductCategoryImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



//      // Create a plain object to send to the API
//   const payload = {
//     productCategoryId: formData.productCategoryId,
//     productCategoryName: formData.productCategoryName,
//     aboutProductCategory: formData.aboutProductCategory,
//     descriptionProductCategory: formData.descriptionProductCategory,
//     status: formData.status,
//   };

//   // If there is a product category image, append it to the payload
//   if (productCategoryImage) {
//     payload.productCategoryImage = productCategoryImage[0];
//   }

  
  const payload = new FormData();
  payload.append('productCategoryId', formData.productCategoryId);
  payload.append('productCategoryName', formData.productCategoryName);
  payload.append('aboutProductCategory', formData.aboutProductCategory);
  payload.append('descriptionProductCategory', formData.descriptionProductCategory);
  payload.append('status', formData.status);

  if (productCategoryImage) {
    payload.append('productCategoryImage', productCategoryImage); // Correct way
  }



    try {
        console.log("I am payload",payload)
      await updateProductCategory(productCategory_ID, payload);
      setAlert({ type: 'success', message: 'Product category updated successfully!' });
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to update product category.' });
    }
  };

  if (!formData.productCategoryId) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className="mt-4">Update Product Category</h2>
      {alert.message && (
        <Alert variant={alert.type} onClose={() => setAlert({ type: '', message: '' })} dismissible>
          {alert.message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Category ID</Form.Label>
              <Form.Control
                type="text"
                name="productCategoryId"
                value={formData.productCategoryId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Category Name</Form.Label>
              <Form.Control
                type="text"
                name="productCategoryName"
                value={formData.productCategoryName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>About Product Category</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="aboutProductCategory"
                value={formData.aboutProductCategory}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
              <Form.Label>Product Category Image</Form.Label>
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
              Update Category
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EditAndDeleteCategory;
