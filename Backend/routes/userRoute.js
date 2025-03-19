import { Router } from "express";
import {
  forgetPasswordController,
  loginController,
  logoutController,
  refreshToken,
  registerUserController,
  resetPassword,
  updateUserDetails,
  uploadAvtar,
  userDetails,
  verifyEmailController,
  verifyPasswordController,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController);
userRouter.put("/upload-avtar", auth, upload.single("avtar"), uploadAvtar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.put("/forget-password", forgetPasswordController);
userRouter.put("/verify-forget-password-otp", verifyPasswordController);
userRouter.put("/reset-password", resetPassword);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user-details", auth, userDetails);

export default userRouter;
