import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import cartProductModel from "../models/cartProductModel.js";

export const cashOnDeliveryPayment = async (req, res) => {
  try {
    const userId = req.userId;
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    const payload = list_items.map((el) => {
      return {
        userId: userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: el.productId._id,

        product_details: {
          name: el.productId.name,
          image: el.productId.image,
        },

        payment_status: "CASH ON DELIVERY",
        delivery_address: addressId,
        subTotalAmt: subTotalAmt,
        totalAmt: totalAmt,
      };
    });

    const generateOrder = await orderModel.insertMany(payload);

    const removeCart = await cartProductModel.deleteMany({ userId: userId });
    const updateUserCart = await userModel.updateOne(
      { _id: userId },
      { shopping_cart: [] }
    );

    res.json({
      message: "Order Placed Successfully",
      success: true,
      error: false,
      data: generateOrder,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
