import { createSlice } from "@reduxjs/toolkit";

const inintianValue = {
  addressList: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState: inintianValue,
  reducers: {
    handleAddAddress: (state, action) => {
      state.addressList = [...action.payload];
    },
  },
});

export const { handleAddAddress } = addressSlice.actions;

export default addressSlice.reducer;
