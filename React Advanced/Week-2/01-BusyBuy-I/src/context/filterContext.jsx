/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react';
import { useProductsContext } from './productsContext';
import reducer from '../reducers/filterReducer';
import { FILTER_PRODUCTS, LOAD_PRODUCTS, UPDATE_FILTERS } from '../actions';

const initialState = {
  filteredProducts: [],
  allProducts: [],
  filters: {
    text: '',
    mensClothing: false,
    womensClothing: false,
    jewelery: false,
    electronics: false,
    maxPrice: 0,
    price: 0,
  },
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
  }, [products, state.filters]);
  const updateFilters = (e, val) => {
    let name, value;
    if (e) {
      name = e.target.name;
      value = e.target.value;
      if (name === 'mensClothing') {
        value = e.target.checked;
      }
      if (name === 'womensClothing') {
        value = e.target.checked;
      }
      if (name === 'jewelery') {
        value = e.target.checked;
      }
      if (name === 'electronics') {
        value = e.target.checked;
      }
    }
    if (val) {
      name = 'price';
      value = val;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  return (
    <FilterContext.Provider value={{ ...state, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
