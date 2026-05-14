import Order from "../models/Order.js";
import { broadcast } from "../server.js";

// GET orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

// POST order
export const createOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    console.log("Order data received:", { userId, items, amount, address });

    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: userId, items, amount, address are required" 
      });
    }

    const newOrder = new Order({
        userId: userId,
        items: items,
        amount: amount,
        address: address
    });
    await newOrder.save();

    // Optionally clear user's cartData here using userModel
    broadcast({ type: "new_order", data: newOrder });

    res.json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.log("Order creation error:", error);
    res.status(500).json({ success: false, message: "Error placing order: " + error.message });
  }
};

// user orders for frontend
export const userOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// cancel order
export const cancelOrder = async (req, res) => {
    try {
        const { orderId, userId } = req.body;
        const order = await Order.findOne({ _id: orderId, userId: userId });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found or unauthorized" });
        }
        await Order.findByIdAndDelete(orderId);
        broadcast({ type: "order_cancelled", data: { orderId } });
        res.json({ success: true, message: "Order cancelled successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error cancelling order" });
    }
};

// update order status
export const updateStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status }, { new: true });
        broadcast({ type: "order_status_updated", data: order });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};