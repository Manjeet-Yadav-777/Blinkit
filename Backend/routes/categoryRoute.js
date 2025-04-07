import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addCategoryModel,
  deleteCategory,
  getCategoryController,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", auth, addCategoryModel);
categoryRouter.get("/get", getCategoryController);
categoryRouter.put("/update", auth, updateCategory);
categoryRouter.delete("/delete", auth, deleteCategory);

export default categoryRouter;
