import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";

const productRouter = Router();

productRouter.post("/create", auth, addProduct);
productRouter.post("/get", auth, getProduct);
productRouter.delete("/delete", auth, deleteProduct);

export default productRouter;
