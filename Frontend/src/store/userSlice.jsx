import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  avtar: "",
  mobile: "",
  verify_email: "",
  last_login_date: "",
  status: "",
  address_details: [],
  shopping_cart: [],
  order_history: [],
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state._id = action?.payload?._id;
      state.name = action?.payload?.name;
      state.email = action?.payload?.email;
      state.avtar = action?.payload?.avtar;
      state.mobile = action?.payload?.mobile;
      state.verify_email = action?.payload?.verify_email;
      state.last_login_date = action?.payload?.last_login_date;
      state.status = action?.payload?.status;
      state.address_details = action?.payload?.address_detils;
      state.shopping_cart = action?.payload?.shopping_cart;
      state.order_history = action?.payload?.order_history;
      state.role = action?.payload?.role;
    },

    updateAvtar: (state, action) => {
      state.avtar = action.payload;
    },

    logout: (state, action) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.avtar = "";
      state.mobile = "";
      state.verify_email = "";
      state.last_login_date = "";
      state.status = "";
      state.address_details = [];
      state.shopping_cart = [];
      state.order_history = [];
      state.role = "";
    },
  },
});

export const { setUserDetails, logout, updateAvtar } = userSlice.actions;
export default userSlice.reducer;
