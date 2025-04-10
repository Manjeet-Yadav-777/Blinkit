import { Router } from "express";
import { addToCart } from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";
const cartRouter = Router();

cartRouter.post("/add", auth, addToCart);

export default cartRouter;
