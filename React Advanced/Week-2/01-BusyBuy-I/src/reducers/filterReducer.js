import {
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  RESET_FILTERS,
  UPDATE_FILTERS,
} from '../actions';

const filterReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PRODUCTS: {
      let maxPrice = payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        allProducts: [...payload],
        filteredProducts: [...payload],
        filters: {
          ...state.filters,
          maxPrice: maxPrice,
          price: maxPrice,
        },
      };
    }
    case UPDATE_FILTERS: {
      const { name, value } = payload;
      // if (name === 'category') {
      //   let categoryArr = [...state.filters.category];
      //   if (categoryArr.includes(value)) {
      //     categoryArr = categoryArr.filter((category) => category !== value);
      //   } else {
      //     categoryArr.push(value);
      //   }
      //   return {
      //     ...state,
      //     filters: {
      //       ...state.filters,
      //       category: categoryArr,
      //     },
      //   };
      // }
      return { ...state, filters: { ...state.filters, [name]: value } };
    }
    case FILTER_PRODUCTS: {
      const { allProducts } = state;
      const {
        text,
        mensClothing,
        womensClothing,
        jewelery,
        electronics,
        price,
      } = state.filters;
      let tempProducts = [...allProducts];
      if (text) {
        tempProducts = tempProducts.filter((pdt) =>
          pdt.title.toLowerCase().startsWith(text)
        );
      }
      // if (category.length > 0) {
      //   tempProducts = tempProducts.filter((pdt) =>
      //     category.includes(pdt.category)
      //   );
      // }
      if (mensClothing) {
        tempProducts = tempProducts.filter(
          (pdt) => pdt.category === "men's clothing"
        );
      }
      if (womensClothing) {
        tempProducts = tempProducts.filter(
          (pdt) => pdt.category === "women's clothing"
        );
      }
      if (jewelery) {
        tempProducts = tempProducts.filter(
          (pdt) => pdt.category === 'jewelery'
        );
      }
      if (electronics) {
        tempProducts = tempProducts.filter(
          (pdt) => pdt.category === 'electronics'
        );
      }

      tempProducts = tempProducts.filter((pdt) => pdt.price <= price);

      return { ...state, filteredProducts: tempProducts };
    }
    case RESET_FILTERS: {
      return {
        ...state,
        filters: { ...state.filters, text: '', category: [] },
      };
    }
    default: {
      throw new Error(`No Matching "${action.type}" - action type`);
    }
  }
};

export default filterReducer;
