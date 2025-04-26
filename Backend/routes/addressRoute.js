import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addAddress, deleteAddress, getAddress } from "../controllers/addressController.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddress);
addressRouter.get("/get", auth, getAddress);
addressRouter.delete("/delete", auth, deleteAddress);

export default addressRouter;
