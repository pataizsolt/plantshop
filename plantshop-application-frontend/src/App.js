import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';
import PrivateContent from './components/PrivateContent';
import Profile from './components/Profile';


function App() {

  return (

    <Routes>
      <Route path='/' element={<Home />} >
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/private' element={<PrivateContent />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>

  );
}

export default App;
