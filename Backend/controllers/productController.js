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

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const deleteProduct = await productModel.findByIdAndDelete({ _id: id });

    return res.json({
      message: "Product Deleted",
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

export const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Provide Category ID",
        success: false,
        error: true,
      });
    }

    const products = await productModel
      .find({
        category: { $in: [id] }, // Make sure id is treated as an array
      })
      .limit(15);

    return res.status(200).json({
      message: "Category Products",
      success: true,
      error: false,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

export const getProductByCategoryAndSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.body;

    if (!categoryId || !subCategoryId) {
      return res.json({
        message: "Provide Category and subCategory",
        error: true,
        success: false,
      });
    }

    const query = {
      category: { $in: categoryId },
      subCategory: { $in: subCategoryId },
    };

    const data = await productModel.find(query).sort({ createdAt: -1 });

    return res.json({
      message: "Product List",
      data: data,
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

export const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findOne({ _id: productId });

    return res.json({
      message: "Product With Id",
      success: true,
      error: false,
      data: product,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const searchProduct = async (req, res) => {
  try {
    let { search } = req.body;

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const data = await productModel
      .find(query)
      .sort({ createdAt: -1 })
      .populate("category subCategory");

    res.json({
      message: "Searched Products",
      error: false,
      success: true,
      data: data,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
