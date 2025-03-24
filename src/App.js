
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

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
import CustomerSignupPage from './components/CustomerSignupPage.jsx';
import CustomerOrders from './components/CustomerOrders.jsx';
import ShowOrders from './components/ShowOrders.jsx';
import PaymentPageByAdmin from "./pages/PaymentPageByAdmin.jsx";
import Footer from './components/Footer.jsx';
import AboutUs from './pages/AboutUs.jsx';


function App() {
  return (
    <>
    
    <Router>
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
          <Route path='/products/:category/:subcategory' element = {<Products/>}/>

          <Route path='/product/:category/:subcategory' element = {<Product/>}/>

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



      </Routes>
      </OrderProvider>
      </ProductContextProvider>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
