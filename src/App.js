
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Whatsapp from './components/Whatsapp.jsx';

//Importing landing page of the site.
import LandingPage from './pages/LandingPage';
import { Navbar } from 'react-bootstrap';

//Importing other componentes.
import PutProductForm from './components/PutProduct';
import ProductForm from './components/ProductForm';
import { ProductSubCategory } from './components/ProductSubCategory';
import ShowProducts from "./components/ShowProducts";
import Products from './components/Products';
import PaymentPage from './pages/PaymentPage';

import Product from './components/Product.jsx';

import OrderConfirmationPage from './components/OrderConfirmationPage.jsx';

//ContextApi imports
import {ProductContextProvider} from "./components/ContextApi/ProductContextApi.js";

import { OrderProvider } from './components/ContextApi/yourOrdersContextApi.js';

//__________________________________________________________
import CartAndCheckout from './components/Cart&Checkout.jsx';
import CustomerOrderForm from './components/CustomerOrderForm.jsx';

import CustomerOrders from './components/CustomerOrders.jsx';
import ShowOrders from './components/ShowOrders.jsx';
import PaymentPageByAdmin from "./pages/PaymentPageByAdmin.jsx";
import Footer from './components/Footer.jsx';
import AboutUs from './pages/AboutUs.jsx';
import CustomerSignupPage from "../src/pages/CustomerSignupPage.jsx";

import PhoneAuth from './components/PhoneAuth.jsx';

//Importing admins compoentts
import CreateProductCategory from './components/ProductAdmin/CreateProductCategory.jsx';
import ProductCategoryList from './components/ProductAdmin/ProductCategoryList.jsx';
import EditAndDeleteCategory from './components/ProductAdmin/EditAndDeleteCategoryForm.jsx';

import CreateProductSubcategory from './components/ProductAdmin/CreateProductSubCategory.jsx';
import ProductSubcategoryList from './components/ProductAdmin/ProductSubCategoryList.jsx';
import EditAndDeleteSubCategory from './components/ProductAdmin/EditAndDeleteSubCategory.jsx';
import CreateFinalProduct from './components/ProductAdmin/CreateFinalProduct.jsx';
import { PrivacePolicy } from './pages/PrivacyPolicy&TermsAndConditions/PrivacyPolicy.jsx';
import { TermsAndConditions } from './pages/PrivacyPolicy&TermsAndConditions/TermsAndConditions.jsx';


function App() {
  return (
    <>
    
    <Router>
      <Whatsapp/>
      <ProductContextProvider>
      <OrderProvider>
      <Routes>
          {/* Routes related to admin panel and payment */}

          <Route path='/' element = {<LandingPage/>}/>
          <Route path='/putProduct' element = {<PutProductForm/>}/>
          <Route path='/ProductForm' element = {<ProductForm/>}/>
          <Route path='/showProudct' element = {<ShowProducts/>}/>
          <Route path='/orders' element = {<ShowOrders/>}/>
          <Route path='/paymentbyadmin' element = {<PaymentPageByAdmin/>}/>
          <Route path='/payment' element = {<PaymentPage/>}/>
        

        {/* ____________________________________________________________________ */}

          {/* Routes related to Products on frontend */}
          
          <Route path='/' element = {<LandingPage/>}/>
          <Route path='/productSubCategory/:id' element = {<ProductSubCategory/>}/>
          <Route path='/products/:productCategory/:productSubCategoryId' element = {<Products/>}/>

          <Route path='/product/:productCategory/:productSubCategoryId' element = {<Product/>}/>

          {/* Routes related to customer orders */}
          <Route path='/customer-order' element = {<CustomerOrders/>}/>

         

          {/* Cart and checkout routes. */}
          <Route path='/cart-checkout' element = {<CartAndCheckout/>}/>

          {/* Customer related pages*/}
          <Route path='/customer-address' element = {<CustomerOrderForm/>}/>
          <Route path='/order-confirmation' element = {<OrderConfirmationPage/>}/>
          <Route path = '/signup' element = {<CustomerSignupPage/>}/>
          <Route path='/orders' element = {<CustomerOrders/>}/>

          <Route path='/about-us' element = {<AboutUs/>}/>


          {/* routes for Customer Signup */}

          <Route path='/sign-up' element = {<CustomerSignupPage/>}/>


        {/* Admint Routes */}
        <Route path='/create-product-category' element = {<CreateProductCategory/>}/>
        <Route path='/product-category-list' element = {<ProductCategoryList/>}/>
        <Route path='/edit-delete-category' element = {<EditAndDeleteCategory/>}/>
        <Route path='/create-product-subcategory' element = {<CreateProductSubcategory/>}/>
        <Route path='/product-subcategory-list' element = {<ProductSubcategoryList/>}/>
        <Route path='/edit-delete-subcategory' element = {<EditAndDeleteSubCategory/>}/>
        <Route path='/create-product' element = {<CreateFinalProduct/>}/>
        



      <Route path='/auth' element = {<PhoneAuth/>}/>

      {/* Privacy policy and Terms and Conditions */}
      <Route path='/privacy-policy' element = {<PrivacePolicy/>}/>
      <Route path='/terms-and-conditions' element = {<TermsAndConditions/>}/>
      </Routes>
      </OrderProvider>
      </ProductContextProvider>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
