import cartProductModel from "../models/cartProductModel.js";
import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;

    const { productId } = req.body;

    if (!productId) {
      return res.json({
        message: "Provide Product Id",
        error: true,
        success: false,
      });
    }

    const checkItem = await cartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItem) {
      return res.json({
        message: "Already in Cart",
        success: false,
        error: true,
      });
    }

    const cartItems = new cartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });

    const save = await cartItems.save();

    const updateCartUser = await userModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

    return res.json({
      message: "Added To Cart",
      success: true,
      error: false,
      data: save,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;

    const cartItems = await cartProductModel
      .find({
        userId: userId,
      })
      .populate("productId");

    return res.json({
      message: "Cart Items",
      data: cartItems,
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

export const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, qty } = req.body;

    if (!_id || !qty) {
      return res.json({
        message: "Provide Product",
        success: false,
        error: true,
      });
    }

    const updateCartItems = await cartProductModel.updateOne(
      {
        _id: _id,
        userId: userId,
      },
      {
        quantity: qty,
      }
    );

    return res.json({
      message: "Quantity Updated",
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

export const deleteCart = async (req, res) => {
  try {
    const userId = req.userId;

    const { _id } = req.body;

    if (!_id) {
      return res.josn({
        message: "Product Not Found",
        success: false,
        error: true,
      });
    }

    const deleteCartItem = await cartProductModel.deleteOne({
      _id: _id,
      userId: userId,
    });

    return res.json({
      message: "Item Removed",
      success: true,
      error: false,
      data: deleteCartItem,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
