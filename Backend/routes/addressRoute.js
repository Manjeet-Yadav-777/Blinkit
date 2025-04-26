import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addAddress } from "../controllers/addressController.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddress);

export default addressRouter;
