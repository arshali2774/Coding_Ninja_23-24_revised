/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/productsReducer';
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
} from '../actions';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase.config';

const initialState = {
  productsLoading: false,
  productsError: false,
  products: [],
};

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const unSubs = onSnapshot(collection(db, 'products'), (querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push(doc.data());
        });
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
      });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <ProductsContext.Provider value={{ ...state }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
