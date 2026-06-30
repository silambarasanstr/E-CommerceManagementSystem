import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// GET /api/cart — Get logged-in user's cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product", "name image price discount");

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }

    // Convert to plain object and ensure all required fields
    const cartData = cart.toObject();

    cartData.items = cartData.items
      .filter((item) => item.product)
      .map((item) => ({
        ...item,
        // Ensure originalPrice is set
        originalPrice: item.originalPrice || item.product.price,
        // Ensure discount is set
        discount: item.discount !== undefined ? item.discount : item.product.discount || 0,
      }));

    res.status(200).json({ data: cartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/cart — Add item to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return res
      .status(400)
      .json({ message: "productId and valid quantity are required" });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const discountedPrice = product.price - (product.price * product.discount) / 100;

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: discountedPrice,
        originalPrice: product.price,
        discount: product.discount,
      });
    }

    cart.calcTotal();
    await cart.save();

    res.status(200).json({ message: "Item added to cart", data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/cart/:itemId — Update item quantity
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Valid quantity is required" });
  }

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    cart.calcTotal();
    await cart.save();

    res.status(200).json({ message: "Cart updated", data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/cart/:itemId — Remove one item from cart
export const removeCartItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemExists = cart.items.id(itemId);

    if (!itemExists) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items.pull(itemId);
    cart.calcTotal();
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/cart — Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(200).json({ message: "Cart cleared", data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
