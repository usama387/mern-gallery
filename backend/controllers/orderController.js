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
const allOrdersForAdminPanel = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting all orders" });
  }
};

// api for order details for user on frontend
const orderDetailsForUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const getUserOrders = await orderModel.find({ userId });

    if (!getUserOrders) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      orderDetails: getUserOrders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting order details" });
  }
};

// api to update order status for user from admin panel
const orderStatusUpdate = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, {
      status,
    });

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating order status" });
  }
};

export {
  orderDetailsForUser,
  orderPlaceWithCod,
  orderStatusUpdate,
  orderPlaceWithStripe,
  allOrdersForAdminPanel,
};
