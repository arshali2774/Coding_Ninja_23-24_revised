// import action constants here
import {
  FETCH_LOADING,
  FETCH_SUCCESS,
  FETCH_ERROR,
} from '../actions/fetchActions';

const INITIAL_STATE = { isLoading: false, data: [], error: null };

// define reducer function here
export const fetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
