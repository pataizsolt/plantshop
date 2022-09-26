import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';
import PrivateContent from './components/PrivateContent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/private' element={<PrivateContent />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
