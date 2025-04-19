import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cartItem",
  initialState: initialState,
  reducers: {
    handleAddCartItems: (state, action) => {
      state.cart = [...action.payload];
    },
  },
});

export const { handleAddCartItems } = cartSlice.actions;

export default cartSlice.reducer;
