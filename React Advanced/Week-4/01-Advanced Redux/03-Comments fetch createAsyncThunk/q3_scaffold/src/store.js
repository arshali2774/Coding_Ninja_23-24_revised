import { configureStore } from "@reduxjs/toolkit";

const { commentsReducer } = require("./redux/reducers/commentsReducer");
export const store = configureStore({
  reducer: { commentsReducer }
});
