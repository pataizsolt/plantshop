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
import { RequireAuth } from './components/RequireAuth';
import MainCategoryManager from './components/MainCategoryManager';
import SubCategoryManager from './components/SubCategoryManager';
import Product from './components/Product';
import ProductManager from './components/ProductManager';

function App() {

  return (

    <Routes>

      <Route path='/' element={<Home />} >
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<LandingPage />} />
        <Route path='/private' element={<PrivateContent />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/store/:category' element={<Store />} />
        <Route path='/store' element={<Store />} />
        <Route path='*' element={<Error />} />


        <Route path='/shoppingbasket' element={
          <RequireAuth><ShoppingBasket /></RequireAuth>}
        />
        <Route path='/checkout' element={
          <RequireAuth><CheckoutForm /></RequireAuth>}
        />
        <Route path='/orders' element={
          <RequireAuth><Orders /></RequireAuth>}
        />

      </Route>
      <Route path='/admin' element={
        <RequireAuth>
          <Admin />
        </RequireAuth>
      }>
        <Route path='/admin/categorymanager' element={<CategoryManager />} />
        <Route path='/admin/branchcategorymanager' element={<BranchCategoryManager />} />
        <Route path='/admin/maincategorymanager/:id' element={<MainCategoryManager />} />
        <Route path='/admin/subcategorymanager/:id' element={<SubCategoryManager />} />
        <Route path='/admin/productmanager' element={<ProductManager />} />
      </Route>
    </Routes>

  );
}

export default App;
