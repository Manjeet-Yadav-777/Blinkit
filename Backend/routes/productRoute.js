import { Router } from "express";
import { addProduct } from "../controllers/productController.js";
import auth from "../middlewares/auth.js";

const productRouter = Router();

productRouter.post("/create", auth, addProduct);

export default productRouter;
