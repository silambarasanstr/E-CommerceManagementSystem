import Product from "../models/Product.js";
import Category from "../models/Category.js";

// 🔍 Search products by name or category
// exports.searchProduct = async (req, res) => {
//   try {
//     const { name, category } = req.query;

//     // Build search filter
//     let filter = {};

//     if (name) {
//       // Case-insensitive partial search
//       filter.name = { $regex: name, $options: "i" };
//     }

//     if (category) {
//       filter.category = { $regex: category, $options: "i" };
//     }

//     const products = await Product.find(filter);

//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Get all Product

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

    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      const categoryDoc = await Category.findOne({
        name: { $regex: `^${category}$`, $options: "i" },
      });

      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }
    if (brand) {
      query.brand = { $regex: brand, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sort options
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      rating: { rating: -1 },
    };

    const sortBy = sortOptions[sort] || { createdAt: -1 };

    // Pagination

    // ✅ Fix: String → Number convert
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;
    const [products, productsCount] = await Promise.all([
      Product.find(query)
        .populate("category") // ✅ ObjectId ref — populate correct
        .sort(sortBy)
        .skip(skip)
        .limit(limitNum),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
      pages: Math.ceil(productsCount / limitNum),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
      message: error.message,
    });
  }
};

// Create a new Product

export const createProduct = async (req, res) => {
  try {
    let image = "";

    // File Upload
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    // URL
    if (req.body.image) {
      image = req.body.image;
    }

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      originalPrice: req.body.originalPrice,
      category: req.body.category,
      image,
      rating: req.body.rating,
      reviews: req.body.reviews,
      inStock: req.body.inStock,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update product (with optional image)
export const updateProduct = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    if (req.body.imageUrl) {
      updateData.image = req.body.imageUrl;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a Product

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get a single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
