import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './redux/reducers/counterReducer';
import { timerReducer } from './redux/reducers/timerReducer';

export const store = configureStore({
  reducer: {
    counterReducer,
    timerReducer,
  },
});
