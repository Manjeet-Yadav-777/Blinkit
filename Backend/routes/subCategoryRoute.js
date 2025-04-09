import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addSubCategory,
  deleteSubCategory,
  getSubCategory,
} from "../controllers/subCategoryController.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, addSubCategory);
subCategoryRouter.get("/get", getSubCategory);
subCategoryRouter.delete("/delete", auth, deleteSubCategory);

export default subCategoryRouter;
