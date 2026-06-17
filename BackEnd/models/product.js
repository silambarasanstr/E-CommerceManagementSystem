import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
    },

    originalPrice: {
      type: Number,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    image: {
      type: String,
    },

    brand: { type: String, trim: true, default: "" },

    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    inStock: {
      type: Boolean,
      default: true,
    },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
