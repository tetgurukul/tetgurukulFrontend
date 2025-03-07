
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Importing landing page of the site.
import LandingPage from './pages/LandingPage';


//Importing other componentes.
import PutProductForm from './components/PutProduct';
import ProductForm from './components/ProductForm';
import { ProductSubCategory } from './components/ProductSubCategory';
import ShowProducts from "./components/ShowProducts";
import Products from './components/Products';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <>
    
    <Router>
      <Routes>
          {/* Routes related to admin panel */}

          <Route path='/' element = {<LandingPage/>}/>
          <Route path='/putProduct' element = {<PutProductForm/>}/>
          <Route path='/ProductForm' element = {<ProductForm/>}/>
          <Route path='/showProudct' element = {<ShowProducts/>}/>

        

          {/* Routes related to Products on frontend */}
          
          <Route path='/' element = {<LandingPage/>}/>
          <Route path='/productSubCategory/:id' element = {<ProductSubCategory/>}/>
          <Route path='/products/:category/:subcategory' element = {<Products/>}/>

          {/* payment pages */}

          <Route path='/payment' element = {<PaymentPage/>}/>



      </Routes>
    </Router>
    </>
  );
}

export default App;
