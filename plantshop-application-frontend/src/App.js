import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';
import PrivateContent from './components/PrivateContent';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import Store from './components/Store';
import ShoppingBasket from './components/ShoppingBasket';
import CheckoutForm from './components/CheckoutForm';
import Orders from './components/Orders';
import CategoryManager from './components/CategoryManager';
import Admin from './components/Admin';
import BranchCategoryManager from './components/BranchCategoryManager';

function App() {

  return (

    <Routes>
      <Route path='/' element={<Home />} >
        <Route path='/home' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/private' element={<PrivateContent />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/store/:category' element={<Store />} />
        <Route path='/store' element={<Store />} />
        <Route path='/shoppingbasket' element={<ShoppingBasket />} />
        <Route path='/checkout' element={<CheckoutForm />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='*' element={<Error />} />
      </Route>
      <Route path='/admin' element={<Admin />}>
        <Route path='/admin/categorymanager' element={<CategoryManager />} />
        <Route path='/admin/branchcategorymanager' element={<BranchCategoryManager />} />
      </Route>
    </Routes>

  );
}

export default App;
