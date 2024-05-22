/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/orderReducer';
import {
  GET_ORDERS_BEGIN,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
} from '../actions';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase.config';
const OrderContext = createContext();

const initialState = {
  orders: [],
  ordersLoading: false,
  ordersError: false,
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchOrders = async () => {
    dispatch({ type: GET_ORDERS_BEGIN });
    try {
      const ordersQuery = query(
        collection(db, 'orders'),
        orderBy('timestamp', 'desc')
      );
      const unSubs = onSnapshot(ordersQuery, (querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push(doc.data());
        });
        dispatch({ type: GET_ORDERS_SUCCESS, payload: { orders } });
      });
    } catch (error) {
      dispatch({ type: GET_ORDERS_ERROR });
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <OrderContext.Provider value={{ ...state }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
