import { configureStore } from '@reduxjs/toolkit';
import { commentReducer } from './redux/reducers/commentsReducer';

// import comments reducer function here and include it inside of the store
export const store = configureStore({
  reducer: { commentReducer },
});
