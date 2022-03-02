import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'
import reportWebVitals from './reportWebVitals';
import { ProductProvider } from './components/pages/prodcontext/ProductContext';
import { UserProvider } from './components/dasboard/dashboardcomponents/usercontext/UserProvider';
import { CartProvider } from './components/pages/prodcontext/CartProvider';
import AuthProvider from './components/auth/AuthProvider';
import {ChakraProvider,} from '@chakra-ui/react'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <ProductProvider>
      <UserProvider>
        <CartProvider>
          <ChakraProvider>
          <App />
          </ChakraProvider>
          </CartProvider>
      </UserProvider>
    </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
