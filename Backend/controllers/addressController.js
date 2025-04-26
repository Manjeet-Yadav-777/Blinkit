import addressModel from "../models/addressModel.js";
import userModel from "../models/userModel.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { address_line, city, state, pincode, country, mobile } = req.body;

    const payload = {
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
    };

    const addressData = new addressModel(payload);
    const saveAddress = await addressData.save();

    const addUserAddress = await userModel.findByIdAndUpdate(userId, {
      $push: {
        address_details: saveAddress._id,
      },
    });

    return res.json({
      message: "Address Added Successfully",
      error: false,
      success: true,
      data: saveAddress,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
