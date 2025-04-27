import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import cartProductModel from "../models/cartProductModel.js";

export const cashOnDeliveryPayment = async (req, res) => {
  try {
    const userId = req.userId;
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    const payload = {
      userId: userId,
      orderId: `ORD-${new mongoose.Types.ObjectId()}`,
      products: list_items.map((el) => ({
        productId: el.productId._id,
        product_details: {
          name: el.productId.name,
          image: el.productId.image,
        },
        quantity: el.quantity, // <<< IMPORTANT: Quantity save kar diya!
      })),
      payment_status: "CASH ON DELIVERY",
      delivery_address: addressId,
      subTotalAmt: subTotalAmt,
      totalAmt: totalAmt,
    };

    const generateOrder = await orderModel.create(payload);

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

export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.userId })
      .populate({
        path: "products.productId",
        select: "name price image",
      })
      .populate({
        path: "delivery_address",
        select: "address_line mobile pincode city state ",
      })
      .lean();

    res.json({
      message: "Orders fetched successfully",
      success: true,
      error: false,
      data: orders,
    });
  } catch (error) {
    res.json({
      message: error.message || "An error occurred while fetching orders",
      success: false,
      error: true,
    });
  }
};
