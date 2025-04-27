import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  cashOnDeliveryPayment,
  getOrders,
} from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/cashondelivery", auth, cashOnDeliveryPayment);
orderRouter.get("/getorders", auth, getOrders);

export default orderRouter;
