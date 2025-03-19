import sendEmail from "../config/sendEmail.js";
import userModel from "../models/userModel.js";
import forgotPasswordTemplate from "../utils/forgetPasswordTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateOtp from "../utils/generateOtp.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloud from "../utils/uploadImageCloud.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        message: "Fill All the Fields",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Already Register Email Please Login",
        error: true,
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new userModel(payload);
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from blinkit",
      html: verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      }),
    });

    return res.json({
      message: "User Register Successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;

    const user = await userModel.findOne({ _id: code });

    if (user) {
      return res.json({
        message: "Invalid User",
        error: true,
        success: false,
      });
    }

    const updateUser = await userModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return res.json({
      message: "Email Verified",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        message: "Provide Email, Password",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "User not Registerd",
        error: true,
        success: false,
      });
    }

    if (user.status != "Active") {
      return res.json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const updateUser = await userModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);

    return res.json({
      message: `Welcome ${user.name}`,
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function logoutController(req, res) {
  try {
    const userid = req.userId; //middleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await userModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function uploadAvtar(req, res) {
  try {
    const userId = req.userId;
    const image = req.file;

    const upload = await uploadImageCloud(image);

    const updateUser = await userModel.findByIdAndUpdate(userId, {
      avtar: upload.url,
    });

    return res.json({
      message: "Profile Updated",
      error: false,
      success: true,
      data: {
        _id: userId,
        avtar: upload.url,
      },
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateUserDetails(req, res) {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;

    let hashPassword = "";

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    const updateUser = await userModel.findByIdAndUpdate(userId, {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(mobile && { mobile: mobile }),
      ...(password && { password: password }),
    });

    return res.json({
      message: "Profile Updated Successfully",
      success: true,
      error: false,
      data: updateUser,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function forgetPasswordController(req, res) {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "Email Not Registered",
        success: false,
        error: true,
      });
    }

    const otp = generateOtp();
    const expiryTime = new Date() + 60 * 60 * 1000;

    const update = await userModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forget_password_expiry: new Date(expiryTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Forget Your Blinkit Password",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    return res.json({
      message: "Otp Sent on Your Email",
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
}

export async function verifyPasswordController(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.json({
        message: "Provide both",
        success: false,
        error: true,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "Email Not Valid",
        success: false,
        error: true,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forget_password_expiry < currentTime) {
      return res.json({
        message: "OTP EXPIRED !",
        success: false,
        error: true,
      });
    }

    if (otp != user.forgot_password_otp) {
      return res.json({
        message: "Invalid OTP",
        success: false,
        error: true,
      });
    }

    const updateUser = await userModel.findByIdAndUpdate(user?._id, {
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });

    return res.json({
      message: "OTP Verified ",
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
}

export async function resetPassword(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.json({
        message: "Provide all the fields",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "Email Not Registered",
        success: false,
        error: true,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.json({
        message: "Password and Confirm Password must be same",
        error: true,
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const update = await userModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: "Password Changed Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function refreshToken(req, res) {
  try {
    const refreshToken =
      req?.cookies?.refreshToken || req?.headers?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.json({
        message: "Unothorized Access",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return res.json({
        message: "Token is Expired",
        success: false,
        error: true,
      });
    }

    const userId = verifyToken?._id;

    const newAccessToken = await generateRefreshToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookiesOption);

    return res.json({
      message: "New Access token generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function userDetails(req, res) {
  try {
    const userId = req.userId;

    const user = await userModel
      .findById(userId)
      .select("-password -refresh_token");

    return res.json({
      message: "Your Profile",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
