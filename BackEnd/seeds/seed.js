import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../models/User.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

dotenv.config();

const adminUser = {
  name: "Admin",
  email: "admin@example.com",
  password: "Admin@123",
  role: "admin",
};

const categories = [
  {
    name: "Electronics",
    description: "Latest gadgets, devices and electronic accessories",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
  },
  {
    name: "Clothing",
    description: "Trendy fashion and everyday wear for men and women",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
  },
  {
    name: "Books",
    description: "Best sellers, textbooks and self-help books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
  },
  {
    name: "Home & Kitchen",
    description: "Everything you need for your home and kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
  },
  {
    name: "Sports",
    description: "Sports equipment, activewear and fitness accessories",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400",
  },
];

const getProducts = (categoryMap) => [
  // Electronics
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life and crystal-clear sound.",
    price: 1999,
    originalPrice: 3499,
    category: categoryMap["Electronics"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    brand: "SoundMax",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isFeatured: true,
  },
  {
    name: "Smartphone 5G Pro",
    description:
      "Latest 5G smartphone with 108MP camera, 5000mAh battery and 6.7-inch AMOLED display.",
    price: 24999,
    originalPrice: 29999,
    category: categoryMap["Electronics"],
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    brand: "TechBrand",
    rating: 4.3,
    reviews: 256,
    inStock: true,
    isFeatured: true,
  },
  {
    name: "Laptop 15.6 inch",
    description:
      "High-performance laptop with Intel i7, 16GB RAM, 512GB SSD and dedicated graphics.",
    price: 54999,
    originalPrice: 64999,
    category: categoryMap["Electronics"],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    brand: "TechBrand",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isFeatured: false,
  },
  {
    name: "Smart Watch Series 5",
    description:
      "Feature-packed smartwatch with health monitoring, GPS, and 7-day battery life.",
    price: 4999,
    originalPrice: 7999,
    category: categoryMap["Electronics"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    brand: "TimeTech",
    rating: 4.2,
    reviews: 340,
    inStock: true,
    isFeatured: true,
  },

  // Clothing
  {
    name: "Men's Casual T-Shirt",
    description:
      "100% cotton comfortable casual t-shirt available in multiple colors. Perfect for everyday wear.",
    price: 399,
    originalPrice: 799,
    category: categoryMap["Clothing"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    brand: "FashionHub",
    rating: 4.0,
    reviews: 512,
    inStock: true,
    isFeatured: false,
  },
  {
    name: "Women's Kurti Set",
    description:
      "Elegant printed kurti with matching palazzo pants. Perfect for casual and semi-formal occasions.",
    price: 899,
    originalPrice: 1499,
    category: categoryMap["Clothing"],
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
    brand: "StyleIndia",
    rating: 4.4,
    reviews: 198,
    inStock: true,
    isFeatured: true,
  },
  {
    name: "Denim Jeans Slim Fit",
    description:
      "Stretchable slim fit jeans with premium denim fabric. Available in blue and black.",
    price: 1299,
    originalPrice: 2199,
    category: categoryMap["Clothing"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    brand: "DenimCo",
    rating: 4.1,
    reviews: 305,
    inStock: true,
    isFeatured: false,
  },

  // Books
  {
    name: "JavaScript: The Good Parts",
    description:
      "A classic guide to the best features of JavaScript, written by Douglas Crockford.",
    price: 449,
    originalPrice: 699,
    category: categoryMap["Books"],
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    brand: "O'Reilly",
    rating: 4.8,
    reviews: 1024,
    inStock: true,
    isFeatured: false,
  },
  {
    name: "Atomic Habits",
    description:
      "An easy and proven way to build good habits and break bad ones. Bestselling self-help book.",
    price: 349,
    originalPrice: 499,
    category: categoryMap["Books"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    brand: "Penguin",
    rating: 4.9,
    reviews: 2048,
    inStock: true,
    isFeatured: true,
  },

  // Home & Kitchen
  {
    name: "Stainless Steel Water Bottle",
    description:
      "Double-wall insulated water bottle that keeps drinks cold for 24 hours and hot for 12 hours.",
    price: 599,
    originalPrice: 999,
    category: categoryMap["Home & Kitchen"],
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    brand: "HydroLife",
    rating: 4.6,
    reviews: 789,
    inStock: true,
    isFeatured: false,
  },
  {
    name: "Non-Stick Cookware Set",
    description:
      "5-piece premium non-stick cookware set with glass lids. Suitable for all cooktops.",
    price: 2499,
    originalPrice: 3999,
    category: categoryMap["Home & Kitchen"],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    brand: "KitchenPro",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    isFeatured: false,
  },

  // Sports
  {
    name: "Yoga Mat Premium",
    description:
      "Extra thick 6mm non-slip yoga mat with carrying strap. Eco-friendly TPE material.",
    price: 799,
    originalPrice: 1299,
    category: categoryMap["Sports"],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    brand: "FitLife",
    rating: 4.5,
    reviews: 423,
    inStock: true,
    isFeatured: true,
  },
  {
    name: "Running Shoes Men",
    description:
      "Lightweight breathable running shoes with cushioned sole and anti-slip grip.",
    price: 1999,
    originalPrice: 3499,
    category: categoryMap["Sports"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    brand: "SpeedRun",
    rating: 4.4,
    reviews: 612,
    inStock: true,
    isFeatured: true,
  },
];

// ─── Seed Function ───────────────────────────────────────────────────────────

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared existing data");

    // Seed admin user
    const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    await User.create({ ...adminUser, password: hashedPassword });
    console.log("Admin user created");

    // Seed categories
    const createdCategories = await Category.insertMany(categories);

    // Build a name → _id map
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });
    console.log("Categories created");

    // Seed products
    await Product.insertMany(getProducts(categoryMap));
    console.log("Products created");

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
  }
};

seedDB();