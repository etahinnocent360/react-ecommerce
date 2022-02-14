import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'
import reportWebVitals from './reportWebVitals';
import { ProductProvider } from './components/pages/prodcontext/ProductContext';
import { UserProvider } from './components/dasboard/dashboardcomponents/usercontext/UserProvider';
import { CartProvider } from './components/pages/prodcontext/CartProvider';

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <UserProvider>
        <CartProvider>
          <App />
          </CartProvider>
      </UserProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
