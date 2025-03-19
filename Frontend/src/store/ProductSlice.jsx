import { createSlice } from "@reduxjs/toolkit";

const inintialValue = {
  allCategory: [],
  subCategory: [],
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: inintialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
  },
});

export const { setAllCategory } = productSlice.actions;

export default productSlice.reducer;
