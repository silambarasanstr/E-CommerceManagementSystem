import Product from "../models/Product.js";
import Category from "../models/Category.js";

// ─── Get All Products (Advanced Filter) ───────────────────────────────────────

export const getAllProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const query = {};

    // ─── Search ─────────────────────────────
    if (search) {
      query.$text = { $search: search };
    }

    // ─── Category filter ────────────────────
    if (category) {
      const categoryDoc = await Category.findOne({
        name: { $regex: `^${category}$`, $options: "i" },
      });

      if (categoryDoc) {
        query.category = categoryDoc._id;
      } else {
        return res.json({
          success: true,
          data: [],
          message: "No category found",
        });
      }
    }

    // ─── Brand filter ───────────────────────
    if (brand) {
      const brands = brand
        .split(",")
        .map((b) => b.trim())
        .filter((b) => b.length > 0); // 👈 empty string ah remove pannu

      if (brands.length > 0) {
        query.brand = { $in: brands };
      }
    }

    // ─── Price filter ───────────────────────
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // ─── Sorting ────────────────────────────
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      rating: { rating: -1 },
    };

    const sortBy = sortOptions[sort] || { createdAt: -1 };

    // ─── Pagination ─────────────────────────
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("category")
        .sort(sortBy)
        .skip(skip)
        .limit(limitNum),

      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─── Get All Products (Simple) ───────────────────────────────────────────────

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─── Create Product ──────────────────────────────────────────────────────────

export const createProduct = async (req, res) => {
  try {
    let image = "";

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (req.body.image) {
      image = req.body.image;
    }

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      originalPrice: Number(req.body.originalPrice),
      discount: Number(req.body.discount || 0),
      category: req.body.category,
      image,
      brand: req.body.brand || "",
      rating: Number(req.body.rating || 0),
      reviews: Number(req.body.reviews || 0),
      inStock: req.body.inStock ?? true,
      isFeatured: req.body.isFeatured ?? false,
      isActive: req.body.isActive ?? true,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─── Update Product ──────────────────────────────────────────────────────────

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    if (req.body.imageUrl) {
      updateData.image = req.body.imageUrl;
    }

    // ensure numeric safety
    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.originalPrice)
      updateData.originalPrice = Number(updateData.originalPrice);
    if (updateData.discount) updateData.discount = Number(updateData.discount);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    ).populate("category");

    res.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─── Delete Product ──────────────────────────────────────────────────────────

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─── Get Single Product ──────────────────────────────────────────────────────

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
