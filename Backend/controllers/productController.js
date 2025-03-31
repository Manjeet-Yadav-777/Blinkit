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

export const getProduct = async (req, res) => {
  try {
    let { page, limit, search } = req.body;

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      productModel.find().sort({ cretaedAt: -1 }).skip(skip).limit(limit),
      productModel.countDocuments(query),
    ]);

    return res.json({
      message: "Product Data",
      success: true,
      error: false,
      data: data,
      totalCount: totalCount,
      totalNoPage: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
    });
  }
};
