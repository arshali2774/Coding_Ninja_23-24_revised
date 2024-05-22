import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ProductsProvider } from './context/productsContext';
import { Toaster } from 'react-hot-toast';
import { FilterProvider } from './context/filterContext.jsx';
import { CartProvider } from './context/cartContext.jsx';
import { OrderProvider } from './context/orderContext.jsx';
import { AuthProvider } from './context/authContext.jsx';
const colors = {
  brand: {
    neutral: '#EAEAEA',
    lightPurple: '#893168',
    violet: '#4A1942',
    darkPurple: '#2E1C2B',
    black: '#050404',
  },
};
const theme = extendTheme({ colors });
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS={true}>
      <AuthProvider>
        <ProductsProvider>
          <FilterProvider>
            <CartProvider>
              <OrderProvider>
                <Toaster position='top-right' />
                <App />
              </OrderProvider>
            </CartProvider>
          </FilterProvider>
        </ProductsProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
