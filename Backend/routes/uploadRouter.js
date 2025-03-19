import { Router } from "express";
import auth from "../middlewares/auth.js";
import uploadImageController from "../controllers/uploadImageController.js";
import upload from "../middlewares/multer.js";
const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  auth,
  upload.single("image"),
  uploadImageController
);

export default uploadRouter;
