import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

/* ─────────────────────────────────────────────
   PLACE ORDER
──────────────────────────────────────────── */
export const placeOrder = async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;

  if (!shippingAddress || !paymentMethod) {
    return res.status(400).json({
      message: "Shipping address and payment method are required",
    });
  }

  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
      "name image price"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Convert cart items → order items
    const orderItems = cart.items.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
    }));

    // Calculate subtotal
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const discount = 0; // you can add coupon logic later
    const shippingFee = 0;

    const totalAmount = subtotal - discount + shippingFee;

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      discount,
      shippingFee,
      totalAmount,
    });

    // Clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ─────────────────────────────────────────────
   GET MY ORDERS
──────────────────────────────────────────── */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ─────────────────────────────────────────────
   GET ORDER BY ID
──────────────────────────────────────────── */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ─────────────────────────────────────────────
   CANCEL ORDER (USER)
──────────────────────────────────────────── */
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
      return res.status(400).json({
        message: `Cannot cancel ${order.orderStatus} order`,
      });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        message: "Order already cancelled",
      });
    }

    if (order.paymentStatus === "Paid") {
      return res.status(400).json({
        message: "Paid order cannot be cancelled",
      });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ─────────────────────────────────────────────
   ADMIN: GET ALL ORDERS
──────────────────────────────────────────── */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ─────────────────────────────────────────────
   ADMIN: UPDATE ORDER STATUS
──────────────────────────────────────────── */
export const updateOrderStatus = async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;

  const validOrderStatuses = [
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const validPaymentStatuses = ["Pending", "Paid", "Failed"];

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (orderStatus && validOrderStatuses.includes(orderStatus)) {
      order.orderStatus = orderStatus;

      if (orderStatus === "Delivered") {
        order.deliveredAt = new Date();
      }
    }

    if (paymentStatus && validPaymentStatuses.includes(paymentStatus)) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ─────────────────────────────────────────────
   ADMIN: DELETE ORDER
──────────────────────────────────────────── */
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};