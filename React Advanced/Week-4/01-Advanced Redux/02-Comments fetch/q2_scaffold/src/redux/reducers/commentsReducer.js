const { createSlice } = require('@reduxjs/toolkit');

// import redux toolkit methods here
const INITIAL_STATE = { comments: [], isLoading: false, error: null };

// define comments reducer function here
const commentSlice = createSlice({
  name: 'comments',
  initialState: INITIAL_STATE,
  reducers: {
    showLoading: (state, action) => {
      state.isLoading = true;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    },
    showError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
// export the comments reducer function and action creators here
export const commentReducer = commentSlice.reducer;
export const { setComments, showError, showLoading } = commentSlice.actions;
// export the comments selector function here
export const commentSelector = (state) => state.commentReducer;
