import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    image: {
      type: Array,
      default: [],
    },

    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],

    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],

    unit: {
      type: String,
      default: "",
    },

    stock: {
      type: Number,
      default: null,
    },

    price: {
      type: Number,
      defualt: null,
    },

    discount: {
      type: Number,
      default: null,
    },

    description: {
      type: String,
      default: "",
    },

    publish: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index(
  {
    name: "text",
    description: "text",
  },
  {
    name: 10,
    description: 5,
  }
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
