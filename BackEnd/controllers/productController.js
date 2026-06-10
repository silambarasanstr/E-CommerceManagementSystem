import Product from "../models/Product.js";

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

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

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
    const product = await Product.findById(req.params.id)
      .populate("category");

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
