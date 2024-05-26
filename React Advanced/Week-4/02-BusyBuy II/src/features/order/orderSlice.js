import { createSlice } from '@reduxjs/toolkit';
import { addOrderThunk, getOrderThunk } from './orderThunk';

const initialState = {
  orders: [],
  ordersLoading: false,
  ordersError: false,
};
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    loadOrders: (state, action) => {
      const { orders } = action.payload;
      state.ordersLoading = false;
      state.orders = orders;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderThunk.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(addOrderThunk.fulfilled, (state) => {
        state.ordersLoading = false;
      })
      .addCase(addOrderThunk.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.payload;
      })
      .addCase(getOrderThunk.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(getOrderThunk.fulfilled, (state) => {
        state.ordersLoading = true;
      })
      .addCase(getOrderThunk.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.payload;
      });
  },
});

export const orderSelector = (state) => state.order;
export const { loadOrders } = orderSlice.actions;
export default orderSlice.reducer;
