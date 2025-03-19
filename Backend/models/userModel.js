import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide Name"],
    },

    email: {
      type: String,
      required: [true, "Provide Email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Provide Password"],
    },

    avtar: {
      type: String,
      default: "",
    },

    mobile: {
      type: Number,
      default: null,
    },

    refresh_token: {
      type: String,
      default: "",
    },

    verify_email: {
      type: Boolean,
      default: false,
    },

    last_login_date: {
      type: Date,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },

    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "address",
      },
    ],

    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "cartProduct",
      },
    ],

    order_history: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "order",
      },
    ],

    forgot_password_otp: {
      type: String,
      default: null,
    },

    forget_password_expiry: {
      type: Date,
      default: "",
    },

    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
