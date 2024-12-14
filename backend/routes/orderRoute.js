import express from "express";
import {
  allOrdersForAdminPanel,
  orderDetailsForUser,
  orderPlaceWithCod,
  // orderPlaceWithStripe,
  orderStatusUpdate,
  // verifyStripePayment,
} from "../controllers/orderController.js";
import verifyAdmin from "../middleware/verifyadmin.js";
import verifyUser from "../middleware/verifyUser.js";

const orderRouter = express.Router();

// api routes for admin
orderRouter.post("/list", verifyAdmin, allOrdersForAdminPanel);
orderRouter.post("/status", verifyAdmin, orderStatusUpdate);

// api routes for payments
orderRouter.post("/place", verifyUser, orderPlaceWithCod);
// orderRouter.post("/stripe", verifyUser, orderPlaceWithStripe);

// api route for user
orderRouter.post("/userOrders", verifyUser, orderDetailsForUser);

// // verify payment
// orderRouter.post("/verifyStripe", verifyUser, verifyStripePayment);

export default orderRouter;
