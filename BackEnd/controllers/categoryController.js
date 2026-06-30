import Category from "../models/Category.js";

// ─── Helper: slug generator ──────────────────────────────────────────────────
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// ─── Create Category ─────────────────────────────────────────────────────────
export const createCategory = async (req, res) => {
  try {
    const { name, description, slug } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    let image = "";

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (req.body.image) {
      image = req.body.image;
    }

    const finalSlug = slug || generateSlug(name);

    const category = await Category.create({
      name,
      slug: finalSlug,
      description: description || "",
      image: image || "",
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─── Get All Categories ───────────────────────────────────────────────────────
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─── Get Single Category ──────────────────────────────────────────────────────
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─── Update Category ─────────────────────────────────────────────────────────
export const updateCategory = async (req, res) => {
  try {
    const { name, description, slug } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    let image = category.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedData = {
      name: name || category.name,
      slug: slug || (name ? generateSlug(name) : category.slug),
      description: description ?? category.description,
      image,
    };

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    res.json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─── Delete Category ─────────────────────────────────────────────────────────
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
