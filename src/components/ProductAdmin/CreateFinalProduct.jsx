import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { createFinalProduct , getProductSubcategories } from '../../services/ProductService';
import NavBar from '../NavBar';

const CreateFinalProduct = () => {
  const [formData, setFormData] = useState({
    productCategory: '',
    productSubCategory: '',
    productId: '',
    productName: '',
    productBy: '',
    aboutProduct: '',
    descriptionProduct: '',
    inStock: 'true',
    stockCount: '',
    author: '',
    publisher: '',
    publicationDate: '',
    edition: '',
    format: '',
    ratings: '',
    status: 'active',
    metaTitle: '',
    metaDescription: '',
    slug: '',
  });

  const [productSubCategories, setProductSubCategories] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await getProductSubcategories();
        setProductSubCategories(response.data);
        console.log(response);
        console.log("i am categories", response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchSubCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    if (productImage) {
      payload.append('productImage', productImage);
    }

    try {
      const response = await createFinalProduct(payload);
      setAlert({ type: 'success', message: 'Final product created successfully!' });

      setFormData({
        productCategory: '',
        productSubCategory: '',
        productId: '',
        productName: '',
        productBy: '',
        aboutProduct: '',
        descriptionProduct: '',
        inStock: 'true',
        stockCount: '',
        author: '',
        publisher: '',
        publicationDate: '',
        edition: '',
        format: '',
        ratings: '',
        status: 'active',
        metaTitle: '',
        metaDescription: '',
        slug: '',
      });
      setProductImage(null);
    } catch (error) {
      setAlert({ type: 'danger', message: error.response?.data?.message || 'Something went wrong' });
    }
  };

  return (
    <Container fluid>
      <nav>
        <NavBar />
      </nav>
      <h2 className="mt-4">Create Final Product</h2>
      {alert.message && (
        <Alert variant={alert.type} onClose={() => setAlert({ type: '', message: '' })} dismissible>
          {alert.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Col md={6}>
            {/* CATEGORY SELECT */}
            <Form.Group controlId="productCategory" className="mb-3">
              <Form.Label>Product Category</Form.Label>
              <Form.Select
                name="productCategory"
                value={formData.productCategory}
                onChange={(e) => {
                  handleChange(e);
                  setFormData((prev) => ({
                    ...prev,
                    productCategory: e.target.value,
                    productSubCategory: '', // reset subcategory when category changes
                  }));
                }}
              >
                <option value="">Select Category</option>
                {[...new Set(productSubCategories.map((item) => item.productCategory))].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* SUBCATEGORY SELECT (showing productSubCategoryId) */}
            <Form.Group controlId="productSubCategory" className="mb-3">
              <Form.Label>Sub Category</Form.Label>
              <Form.Select
                name="productSubCategory"
                value={formData.productSubCategory}
                onChange={handleChange}
                disabled={!formData.productCategory}
              >
                <option value="">Select Subcategory</option>
                {productSubCategories
                  .filter((sub) => sub.productCategory === formData.productCategory)
                  .map((sub) => (
                    <option key={sub._id} value={sub.productSubCategoryId}>
                      {sub.productSubCategoryId}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="productId" className="mb-3">
              <Form.Label>Product ID</Form.Label>
              <Form.Control type="text" name="productId" value={formData.productId} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="productName" className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="productName" value={formData.productName} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="productBy" className="mb-3">
              <Form.Label>Product By</Form.Label>
              <Form.Control type="text" name="productBy" value={formData.productBy} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="aboutProduct" className="mb-3">
              <Form.Label>About Product</Form.Label>
              <Form.Control as="textarea" name="aboutProduct" value={formData.aboutProduct} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="descriptionProduct" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="descriptionProduct" value={formData.descriptionProduct} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="productImage" className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="stockCount" className="mb-3">
              <Form.Label>Stock Count</Form.Label>
              <Form.Control type="number" name="stockCount" value={formData.stockCount} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="inStock" className="mb-3">
              <Form.Label>In Stock</Form.Label>
              <Form.Select name="inStock" value={formData.inStock} onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="author" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" value={formData.author} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="publisher" className="mb-3">
              <Form.Label>Publisher</Form.Label>
              <Form.Control type="text" name="publisher" value={formData.publisher} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="publicationDate" className="mb-3">
              <Form.Label>Publication Date</Form.Label>
              <Form.Control type="date" name="publicationDate" value={formData.publicationDate} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="edition" className="mb-3">
              <Form.Label>Edition</Form.Label>
              <Form.Control type="text" name="edition" value={formData.edition} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="format" className="mb-3">
              <Form.Label>Format</Form.Label>
              <Form.Control type="text" name="format" value={formData.format} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="ratings" className="mb-3">
              <Form.Label>Ratings</Form.Label>
              <Form.Control type="number" name="ratings" value={formData.ratings} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="metaTitle" className="mb-3">
              <Form.Label>Meta Title</Form.Label>
              <Form.Control type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="metaDescription" className="mb-3">
              <Form.Label>Meta Description</Form.Label>
              <Form.Control as="textarea" name="metaDescription" value={formData.metaDescription} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="slug" className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control type="text" name="slug" value={formData.slug} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Create Final Product
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateFinalProduct;
