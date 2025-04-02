import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import subCategoryModel from "../models/subCategoryModel.js";

export const addCategoryModel = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.json({
        message: "Provide Name and Image both",
        error: true,
        success: false,
      });
    }

    const addCategory = new categoryModel({
      name,
      image,
    });

    const savecategory = await addCategory.save();

    if (!savecategory) {
      return res.json({
        message: "Something Went Wrong",
        success: false,
        error: true,
      });
    }

    return res.json({
      message: "Category added",
      success: true,
      error: false,
      data: savecategory,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ createdAt: -1 });

    return res.json({
      data: categories,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { categoryId, name, image } = req.body;

    const update = await categoryModel.updateOne(
      {
        _id: categoryId,
      },
      {
        name,
        image,
      }
    );

    return res.json({
      message: "Category Updated",
      success: true,
      error: false,
      data: update,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.body;

    // Check if category is used in subcategories

    const checkSubCategory = await subCategoryModel.countDocuments({
      category: _id,
    });

    // Check if category is used in products
    const checkProduct = await productModel.countDocuments({ category: _id });

    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.json({
        message: "Category is in use and cannot be deleted",
        success: false,
        error: true,
      });
    }

    // Delete category
    const deleteCat = await categoryModel.deleteOne({ _id });

    return res.json({
      message: "Category deleted successfully",
      error: false,
      success: true,
      data: deleteCat,
    });
  } catch (error) {
    return res.json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};
