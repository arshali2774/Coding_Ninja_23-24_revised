import {
  ADD_TO_CART,
  DELETE_CART_ITEM,
  GET_CARTS_BEGIN,
  GET_CARTS_ERROR,
  GET_CARTS_SUCCESS,
  UPDATE_QUANTITY,
} from '../actions';

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART: {
      const { cartItem } = payload;
      const existingCart = state.cart.find(
        (c) => c.cartItemId === cartItem.cartItemId
      );
      if (!existingCart) {
        return { ...state, cart: [cartItem, ...state.cart] };
      } else {
        return { ...state };
      }
    }
    case GET_CARTS_BEGIN: {
      return { ...state, cartsLoading: true };
    }
    case GET_CARTS_SUCCESS: {
      const totalItems = payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalAmount = payload.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      return {
        ...state,
        cartsLoading: false,
        cart: payload,
        totalItems,
        totalAmount,
      };
    }
    case GET_CARTS_ERROR: {
      return { ...state, cartsLoading: false, cartsError: true };
    }
    case UPDATE_QUANTITY: {
      const { cartItemId, updatedQuantity } = payload;
      const updatedCart = state.cart.map((c) =>
        c.cartItemId === cartItemId ? { ...c, quantity: updatedQuantity } : c
      );
      return { ...state, cart: updatedCart };
    }
    case DELETE_CART_ITEM: {
      const { cartItemId } = payload;
      const updatedCart = state.cart.filter((c) => c.cartItemId !== cartItemId);
      return { ...state, cart: updatedCart };
    }
    default: {
      throw new Error(`No Matching "${type}" - action type`);
    }
  }
};

export default cartReducer;
