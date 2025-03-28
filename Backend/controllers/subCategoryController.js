import subCategoryModel from "../models/subCategoryModel.js";

export const addSubCategory = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!name && !image && !category[0]) {
      return res.json({
        message: "Fill all the fields",
        success: false,
        error: true,
      });
    }

    const payload = {
      name,
      image,
      category,
    };

    const newSubCategory = new subCategoryModel(payload);
    const save = await newSubCategory.save();

    return res.json({
      message: "Sub Category Added",
      data: save,
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

export const getSubCategory = async (req, res) => {
  try {
    const data = await subCategoryModel
      .find()
      .sort({ createdAt: -1 })
      .populate("category");

    return res.json({
      message: "Sub Category Data",
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

export const deleteSubCategory = async (req, res) => {
  try {
    const { _id } = req.body;

    console.log(_id);

    const deleteCate = await subCategoryModel.findByIdAndDelete(_id);

    return res.json({
      message: "Sub Category deleted",
      data: deleteCate,
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
