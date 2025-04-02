import { createSlice } from "@reduxjs/toolkit";

const inintialValue = {
  allCategory: [],
  loadingCategory: false,
  allSubCategory: [],
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: inintialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },

    setLoadingCategory: (state, action) => {
      state.loadingCategory = action.payload;
    },

    setAllSubCategory: (state, action) => {
      state.allSubCategory = [...action.payload];
    },
  },
});

export const { setAllCategory, setAllSubCategory, setLoadingCategory } =
  productSlice.actions;

export default productSlice.reducer;
