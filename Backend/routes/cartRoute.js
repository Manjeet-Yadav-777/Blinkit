import { Router } from "express";
import { addToCart, getCartItems } from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";
const cartRouter = Router();

cartRouter.post("/add", auth, addToCart);
cartRouter.get("/get", auth, getCartItems)

export default cartRouter;
