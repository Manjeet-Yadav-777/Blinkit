import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addSubCategory } from "../controllers/subCategoryController.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, addSubCategory);

export default subCategoryRouter;
