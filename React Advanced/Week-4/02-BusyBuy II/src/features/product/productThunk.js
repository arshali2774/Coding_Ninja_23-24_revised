import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { loadProducts } from './productSlice';
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const unSubs = onSnapshot(collection(db, 'products'), (querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push(doc.data());
        });
        dispatch(loadProducts(products));
      });
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
