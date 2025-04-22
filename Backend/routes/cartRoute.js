import { Router } from "express";
import {
  addToCart,
  deleteCart,
  getCartItems,
  updateCart,
} from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";
const cartRouter = Router();

cartRouter.post("/add", auth, addToCart);
cartRouter.get("/get", auth, getCartItems);
cartRouter.put("/update-qty", auth, updateCart);
cartRouter.delete("/delete", auth, deleteCart);

export default cartRouter;
