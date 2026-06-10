import Category from "../models/Category.js";

// Create Category
export const createCategory = async (req, res) => {
  try {
    let image = "";

    // Upload File
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    // Image URL
    if (req.body.image) {
      image = req.body.image;
    }

    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,
      image,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Category
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};