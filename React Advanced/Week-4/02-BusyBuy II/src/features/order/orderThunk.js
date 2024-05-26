import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import moment from 'moment';
import toast from 'react-hot-toast';
import { loadOrders } from './orderSlice';

export const addOrderThunk = createAsyncThunk(
  'order/addOrderThunk',
  async ({ cart, cartTotal }, { rejectWithValue }) => {
    try {
      const newOrderRef = doc(collection(db, 'orders'));
      const formattedDate = moment().format('DD MMMM YYYY');
      const totalAmount = cartTotal;
      await setDoc(newOrderRef, {
        items: cart,
        totalAmount,
        date: formattedDate,
        timestamp: Timestamp.fromDate(new Date()),
      });
      cart.map(async (c) => {
        await deleteDoc(doc(db, 'carts', c.cartItemId));
      });
      toast.success('Order Placed');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderThunk = createAsyncThunk(
  'order/getOrderThunk',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const ordersQuery = query(
        collection(db, 'orders'),
        orderBy('timestamp', 'desc')
      );
      // eslint-disable-next-line no-unused-vars
      const unSubs = onSnapshot(ordersQuery, (querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push(doc.data());
        });
        // eslint-disable-next-line no-unused-vars
        const formattedOrders = orders.map(({ timestamp, ...rest }) => rest);
        dispatch(loadOrders({ orders: formattedOrders }));
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
