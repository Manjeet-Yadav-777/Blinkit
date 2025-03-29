import productModel from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      description,
      unit,
      stock,
      price,
      discount,
    } = req.body;

    if (
      !name ||
      !image[0] ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !description ||
      !stock ||
      !discount ||
      !price
    ) {
      return res.json({
        message: "Fill all the fields",
        success: false,
        error: true,
      });
    }

    const product = new productModel({
      name,
      image,
      category,
      subCategory,
      unit,
      description,
      stock,
      discount,
      price,
    });

    const saveProduct = await product.save();

    return res.json({
      message: "Product Uploaded",
      data: saveProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
