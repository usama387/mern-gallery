import express from "express";
import {
  addProduct,
  getProduct,
  listProducts,
  removeProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import verifyAdmin from "../middleware/verifyadmin.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  verifyAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", verifyAdmin, removeProduct);
productRouter.post("/get", getProduct);
productRouter.get("/list", listProducts);

export default productRouter;
