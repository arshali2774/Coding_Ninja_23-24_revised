import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
} from '../actions';

const productsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS_BEGIN: {
      return { ...state, productsLoading: true };
    }
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        productsLoading: false,
        products: payload,
      };
    }
    case GET_PRODUCTS_ERROR: {
      return { ...state, productsLoading: false, productsError: true };
    }
    default: {
      throw new Error(`No Matching "${type}" - action type`);
    }
  }
};

export default productsReducer;
