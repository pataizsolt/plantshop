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
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>

  );
}

export default App;
