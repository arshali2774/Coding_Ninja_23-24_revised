// counterReducer.js
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { count: 0 };

// Refactor to use the createSlice method
const counterSlice = createSlice({
  name: 'counter',
  initialState: INITIAL_STATE,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
  },
});

// Export the counter reducer function and action creators
export const counterReducer = counterSlice.reducer;
export const { increment, decrement, reset } = counterSlice.actions;
