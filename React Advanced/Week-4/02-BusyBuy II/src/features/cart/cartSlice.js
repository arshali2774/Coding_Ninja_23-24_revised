import { createSlice } from '@reduxjs/toolkit';
import {
  addToCartThunk,
  getCartThunk,
  removeCartItemThunk,
  updateQuantityThunk,
} from './cartThunk';

const initialState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  cartsLoading: false,
  cartsError: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart: (state, action) => {
      state.totalItems = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = action.payload.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      state.cartsLoading = false;
      state.cart = action.payload;
    },
    // updateCart: (state, action) => {
    //   const { cartItemId, updatedQuantity } = action.payload;

    //   const updatedCart = state.cart.map((c) =>
    //     c.cartItemId === cartItemId ? { ...c, quantity: updatedQuantity } : c
    //   );
    //   state.cart = updatedCart;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.cartsLoading = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.cartsLoading = false;
        const cartItem = action.payload;
        const existingCart = state.cart.find(
          (c) => c.cartItemId === cartItem.cartItemId
        );
        if (!existingCart) {
          state.cart = [cartItem, ...state.cart];
        }
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.cartsError = action.payload;
        state.cartsLoading = false;
      })
      .addCase(getCartThunk.pending, (state) => {
        state.cartsLoading = true;
      })
      .addCase(getCartThunk.fulfilled, (state) => {
        state.cartsLoading = true;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.cartsLoading = false;
        state.cartsError = action.payload;
      })
      .addCase(updateQuantityThunk.pending, (state) => {
        state.cartsLoading = false;
      })
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        const { updatedQuantity, cartItemId } = action.payload;
        state.cartsLoading = false;
        const updatedCart = state.cart.map((c) =>
          c.cartItemId === cartItemId ? { ...c, quantity: updatedQuantity } : c
        );
        state.cart = updatedCart;
      })
      .addCase(updateQuantityThunk.rejected, (state, action) => {
        state.cartsLoading = false;
        state.cartsError = action.payload;
      })
      .addCase(removeCartItemThunk.fulfilled, (state, action) => {
        const { cartItemId } = action.payload;
        const updatedCart = state.cart.filter(
          (c) => c.cartItemId !== cartItemId
        );
        state.cart = updatedCart;
      })
      .addCase(removeCartItemThunk.rejected, (state, action) => {
        state.cartsError = action.payload;
      });
  },
});

export const { loadCart, updateCart } = cartSlice.actions;
export const cartSelector = (state) => state.cart;
export default cartSlice.reducer;
