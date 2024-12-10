import express from "express";
import {
  addProductToCart,
  getUserCartDetail,
  updateProductCart,
} from "../controllers/cartController.js";
import verifyUser from "../middleware/verifyUser.js";

const cartRouter = express.Router();

cartRouter.post("/getUserCart",verifyUser, getUserCartDetail);
cartRouter.post("/add",verifyUser, addProductToCart);
cartRouter.post("/update",verifyUser, updateProductCart);

export default cartRouter;
