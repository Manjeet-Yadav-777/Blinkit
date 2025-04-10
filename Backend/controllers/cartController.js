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
