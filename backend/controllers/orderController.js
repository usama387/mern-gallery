import orderModel from "../models/order.js";
import userModel from "../models/user.js";

// api for orders placed using cod method
const orderPlaceWithCod = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // now create an object of order data\
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      date: Date.now(),
      payment: false,
    };

    // then pass this object to order model
    const newOrder = await orderModel(orderData);

    // now save it
    await newOrder.save();

    // now clear cart data of user once order has been placed
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error placing order" });
  }
};

// api for orders placed using stripe method
const orderPlaceWithStripe = async (req, res) => {};

// api for all orders for admin panel
const allOrdersForAdminPanel = async (req, res) => {};

// api for order details for user on frontend
const orderDetailsForUser = async (req, res) => {};

// api to update order status for user from admin panel
const orderStatusUpdate = async (req, res) => {};

export {
  orderDetailsForUser,
  orderPlaceWithCod,
  orderStatusUpdate,
  orderPlaceWithStripe,
  allOrdersForAdminPanel,
};
