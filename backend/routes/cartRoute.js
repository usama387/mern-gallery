import express from "express";
import {
  addProductToCart,
  getUserCartDetail,
  updateProductCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/getUserCart", getUserCartDetail);
cartRouter.post("/add", addProductToCart);
cartRouter.post("/update", updateProductCart);

export default cartRouter;
