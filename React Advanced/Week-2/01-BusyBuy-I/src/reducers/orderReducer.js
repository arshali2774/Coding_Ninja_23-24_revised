import {
  GET_ORDERS_BEGIN,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
} from '../actions';

const orderReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDERS_BEGIN: {
      return { ...state, ordersLoading: true };
    }
    case GET_ORDERS_SUCCESS: {
      const { orders } = payload;
      return { ...state, ordersLoading: false, orders };
    }
    case GET_ORDERS_ERROR: {
      return { ...state, ordersLoading: false, ordersError: true };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default orderReducer;
