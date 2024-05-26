import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import productReducer from './features/product/productSlice';
import cartReducer from './features/cart/cartSlice';
import orderReducer from './features/order/orderSlice';
import { listenToAuthChanges } from './features/auth/authThunk';
import { fetchProducts } from './features/product/productThunk';
import { getCartThunk } from './features/cart/cartThunk';
import { getOrderThunk } from './features/order/orderThunk';

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
// Dispatch thunk to listen for auth changes
store.dispatch(listenToAuthChanges());
store.dispatch(fetchProducts());
store.dispatch(getCartThunk());
store.dispatch(getOrderThunk());
export default store;
