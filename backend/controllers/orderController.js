import orderModel from "../models/order.js";
import userModel from "../models/user.js";
import Stripe from "stripe";

// global variables
const currency = "pkr";
const deliveryCharges = 250;

// stripe gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
const orderPlaceWithStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // origin contain client url from payment is done
    const { origin } = req.headers;

    // now create an object of order data\
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      date: Date.now(),
      payment: false,
    };

    // then pass this object to order model
    const newOrder = await orderModel(orderData);

    // now save it
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    // creating a checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.status(200).json({
      success: true,
      session_url: session.url,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error placing order using Stripe" });
  }
};

// verify stripe payment
const verifyStripePayment = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;

    if (!success || !orderId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const isSuccess = success === "true" || success === true;

    if (isSuccess) {
      // set payment status to true
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      // clear cart data of user once payment has been made
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error verifying payment" });
  }
};

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
  verifyStripePayment,
};
