import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// POST /api/products/:id/reviews — Add a review
export const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.id;

  if (!rating || !comment) {
    return res.status(400).json({ message: "Rating and comment are required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Only allow review if user has purchased and received the product
    const hasPurchased = await Order.findOne({
      user: req.user.id,
      "items.product": productId,
      orderStatus: "Delivered",
    });

    if (!hasPurchased) {
      return res.status(403).json({
        message: "You can only review products you have purchased and received",
      });
    }

    const existing = await Review.findOne({
      product: productId,
      user: req.user.id,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    const review = await Review.create({
      product: productId,
      user: req.user.id,
      rating,
      comment,
    });

    // Update product average rating
    const allReviews = await Review.find({ product: productId });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    product.rating = Math.round(avgRating * 10) / 10;
    product.numReviews = allReviews.length;
    await product.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/products/:id/reviews — Get all reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = await Review.find({ product: req.params.id })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: reviews.length,
      rating: product.rating || 0,
      reviews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/reviews/:id — Delete a review (owner or admin)
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const isOwner = review.user.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.deleteOne();

    // Recalculate product rating after delete
    const product = await Product.findById(review.product);
    if (product) {
      const allReviews = await Review.find({ product: review.product });
      product.rating =
        allReviews.length > 0
          ? Math.round(
              (allReviews.reduce((sum, r) => sum + r.rating, 0) /
                allReviews.length) *
                10
            ) / 10
          : 0;
      product.numReviews = allReviews.length;
      await product.save();
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
