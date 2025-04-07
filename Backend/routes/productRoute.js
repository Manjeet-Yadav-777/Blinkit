import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";

const productRouter = Router();

productRouter.post("/create", auth, addProduct);
productRouter.post("/get", getProduct);
productRouter.delete("/delete", auth, deleteProduct);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post(
  "/get-product-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);

export default productRouter;
