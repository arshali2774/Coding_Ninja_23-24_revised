import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { loadCart } from './cartSlice';
import toast from 'react-hot-toast';

export const addToCartThunk = createAsyncThunk(
  'cart/addToCartThunk',
  async (product, { rejectWithValue }) => {
    try {
      const cartCollectionRef = collection(db, 'carts');
      const q = query(cartCollectionRef, where('id', '==', product.id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // If the product exists, update the existing document
        const existingDoc = querySnapshot.docs[0];
        const existingProduct = existingDoc.data();
        const updatedQuantity = existingProduct.quantity + 1;
        await updateDoc(existingDoc.ref, {
          quantity: updatedQuantity,
          cartItemId: existingDoc.id,
        });
        const cartItem = {
          ...product,
          quantity: updatedQuantity,
          cartItemId: existingDoc.id,
        };
        return cartItem;
      } else {
        // If the product does not exist, add it with a random ID
        const newDocRef = doc(collection(db, 'carts'));

        await setDoc(newDocRef, {
          ...product,
          quantity: 1,
          cartItemId: newDocRef.id,
        });
        const cartItem = { ...product, quantity: 1, cartItemId: newDocRef.id };
        toast.success('Item Added to cart');
        return cartItem;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCartThunk = createAsyncThunk(
  'cart/getCartThunk',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const unSubs = onSnapshot(collection(db, 'carts'), (querySnapshot) => {
        const carts = [];
        querySnapshot.forEach((doc) => {
          carts.push(doc.data());
        });
        dispatch(loadCart(carts));
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuantityThunk = createAsyncThunk(
  'cart/updatedQuantity',
  async ({ cartItemId, newQuantity }, { rejectWithValue }) => {
    let updatedQuantity = newQuantity < 1 ? 1 : newQuantity;
    try {
      const cartDocRef = doc(db, 'carts', cartItemId);
      await updateDoc(cartDocRef, { quantity: updatedQuantity });
      return { updatedQuantity, cartItemId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeCartItemThunk = createAsyncThunk(
  'cart/removeCartItemThunk',
  async (cartItemId, { rejectWithValue }) => {
    try {
      const cartDocRef = doc(db, 'carts', cartItemId);
      await deleteDoc(cartDocRef);
      toast.success('Product removed from cart');
      return { cartItemId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
