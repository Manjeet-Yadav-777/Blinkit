import { Router } from "express";
import auth from "../middlewares/auth.js";
import { cashOnDeliveryPayment } from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/cashondelivery", auth, cashOnDeliveryPayment);

export default orderRouter;
