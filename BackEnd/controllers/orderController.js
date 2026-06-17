import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// POST /api/orders — Place a new order
export const placeOrder = async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;

  if (!shippingAddress || !paymentMethod) {
    return res
      .status(400)
      .json({ message: "Shipping address and payment method are required" });
  }

  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
      "name image price"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount: cart.totalAmount,
    });

    // Clear cart after placing order
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/orders — Get my orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("items.product", "name image");

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/orders/:id — Get single order details
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product",
      "name image"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Users can only see their own orders
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/orders/:id/cancel — Cancel an order
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
        message: `Cannot cancel an order that is already ${order.orderStatus}`,
      });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({ message: "Order is already cancelled" });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ─── Admin Controllers ───────────────────────────────────────────────────────

// GET /api/admin/orders — Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("items.product", "name image");

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/admin/orders/:id/status — Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;

  const validOrderStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
  const validPaymentStatuses = ["Pending", "Paid", "Failed"];

  if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
    return res.status(400).json({ message: "Invalid order status" });
  }

  if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
    return res.status(400).json({ message: "Invalid payment status" });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    if (orderStatus === "Delivered") {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
