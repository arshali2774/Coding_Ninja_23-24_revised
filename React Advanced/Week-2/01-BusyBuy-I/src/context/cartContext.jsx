/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/cartReducer';
import {
  ADD_TO_CART,
  DELETE_CART_ITEM,
  GET_CARTS_BEGIN,
  GET_CARTS_ERROR,
  GET_CARTS_SUCCESS,
  UPDATE_QUANTITY,
} from '../actions';
import {
  Timestamp,
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
import { db } from '../config/firebase.config';
import moment from 'moment';
import toast from 'react-hot-toast';
const CartContext = createContext();

const initialState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  cartsLoading: false,
  cartsError: false,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCart = async () => {
    dispatch({ type: GET_CARTS_BEGIN });
    try {
      const unSubs = onSnapshot(collection(db, 'carts'), (querySnapshot) => {
        const carts = [];
        querySnapshot.forEach((doc) => {
          carts.push(doc.data());
        });
        dispatch({ type: GET_CARTS_SUCCESS, payload: carts });
      });
    } catch (error) {
      dispatch({ type: GET_CARTS_ERROR });
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  const addToCart = async (product) => {
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
        dispatch({
          type: ADD_TO_CART,
          payload: {
            cartItem: {
              ...product,
              quantity: updatedQuantity,
              cartItemId: existingDoc.id,
            },
          },
        });
      } else {
        // If the product does not exist, add it with a random ID
        const newDocRef = doc(collection(db, 'carts'));

        await setDoc(newDocRef, {
          ...product,
          quantity: 1,
          cartItemId: newDocRef.id,
        });
        dispatch({
          type: ADD_TO_CART,
          payload: {
            cartItem: { ...product, quantity: 1, cartItemId: newDocRef.id },
          },
        });
      }
      toast.success(`Product added to cart`);
    } catch (error) {
      console.log(error);
    }
  };
  const updateQuantity = async (cartItemId, newQuantity) => {
    let updatedQuantity = newQuantity < 1 ? 1 : newQuantity;

    try {
      const cartDocRef = doc(db, 'carts', cartItemId);
      await updateDoc(cartDocRef, { quantity: updatedQuantity });
      dispatch({
        type: UPDATE_QUANTITY,
        payload: { updatedQuantity, cartItemId },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const removeCartItem = async (cartItemId) => {
    try {
      const cartDocRef = doc(db, 'carts', cartItemId);
      await deleteDoc(cartDocRef);
      dispatch({ type: DELETE_CART_ITEM, payload: { cartItemId } });
      toast.success('Product removed from cart');
    } catch (error) {
      console.error(error);
    }
  };
  const addOrder = async (cart) => {
    try {
      const newOrderRef = doc(collection(db, 'orders'));
      const formattedDate = moment().format('DD MMMM YYYY');
      const totalAmount = state.totalAmount;
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
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, updateQuantity, removeCartItem, addOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
