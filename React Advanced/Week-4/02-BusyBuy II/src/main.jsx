import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';

import { Provider } from 'react-redux';
import store from './store.js';
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
    <Provider store={store}>
      <ChakraProvider theme={theme} resetCSS={true}>
        <Toaster position='top-right' />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
