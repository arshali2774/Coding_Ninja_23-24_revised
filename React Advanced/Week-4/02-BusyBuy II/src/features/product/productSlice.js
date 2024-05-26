import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productThunk';

const initialState = {
  productsLoading: false,
  productsError: false,
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

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
      let maxPrice = state.allProducts.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      state.productsLoading = false;
      state.filters.maxPrice = maxPrice;
      state.filters.price = maxPrice;
    },
    updateFilter: (state, action) => {
      const { name, value } = action.payload;
      state.filters[name] = value;
    },
    filterProducts: (state) => {
      let tempProducts = state.allProducts;
      if (state.filters.text) {
        tempProducts = tempProducts.filter((pdt) =>
          pdt.title.toLowerCase().startsWith(state.filters.text)
        );
      }
      if (state.filters.mensClothing) {
        tempProducts = tempProducts.filter(
          (pdt) => pdt.category === "men's clothing"
        );
      }
      if (state.filters.womensClothing) {
        tempProducts = tempProducts.filter(
          (pdt) => pdt.category === "women's clothing"
        );
      }
      if (state.filters.jewelery) {
        tempProducts = tempProducts.filter(
          (pdt) => pdt.category === 'jewelery'
        );
      }
      if (state.filters.electronics) {
        tempProducts = tempProducts.filter(
          (pdt) => pdt.category === 'electronics'
        );
      }
      tempProducts = tempProducts.filter(
        (pdt) => pdt.price <= state.filters.price
      );
      state.filteredProducts = tempProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoading = true;
        state.productsError = false;
      })
      .addCase(fetchProducts.fulfilled, (state) => {
        state.productsLoading = true;
        state.productsError = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.productsLoading = false;
        state.productsError = true;
      });
  },
});
export const { loadProducts, updateFilter, filterProducts } =
  productSlice.actions;
export const productSelector = (state) => state.product;
export default productSlice.reducer;
