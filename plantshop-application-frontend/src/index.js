import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import GlobalStyle from './GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <ToastContainer />

        <App />

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode >

);

