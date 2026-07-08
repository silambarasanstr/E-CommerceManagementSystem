import dns from "dns";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../models/User.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

// ─── Admin User ───────────────────────────────────────────────────────────────

const adminUser = {
  name: "Admin",
  email: "admin@example.com",
  password: "Admin@123",
  role: "admin",
};

// ─── Categories ───────────────────────────────────────────────────────────────

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets, devices and electronic accessories",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
  },
  {
    name: "Clothing",
    slug: "clothing",
    description: "Trendy fashion and everyday wear for men and women",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
  },
  {
    name: "Books",
    slug: "books",
    description: "Best sellers, textbooks and self-help books",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    description: "Everything you need for your home and kitchen",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
  },
  {
    name: "Sports",
    slug: "sports",
    description: "Sports equipment, activewear and fitness accessories",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400",
  },
];

// ─── Products Generator ───────────────────────────────────────────────────────

const getProducts = (categoryMap) => [
  // ================= ELECTRONICS =================
  {
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life and crystal-clear sound.",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    category: categoryMap["Electronics"],
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    brand: "SoundMax",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Smartphone 5G Pro",
    slug: "smartphone-5g-pro",
    description:
      "Latest 5G smartphone with 108MP camera, 5000mAh battery and 6.7-inch AMOLED display.",
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    category: categoryMap["Electronics"],
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    brand: "TechBrand",
    rating: 4.3,
    reviews: 256,
    inStock: true,
    isFeatured: true,
    isActive: true,
  },

  // ================= CLOTHING =================
  {
    name: "Men's Casual T-Shirt",
    slug: "mens-casual-t-shirt",
    description:
      "100% cotton comfortable casual t-shirt available in multiple colors.",
    price: 399,
    originalPrice: 799,
    discount: 50,
    category: categoryMap["Clothing"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    brand: "FashionHub",
    rating: 4.0,
    reviews: 512,
    inStock: true,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Women's Kurti Set",
    slug: "womens-kurti-set",
    description:
      "Elegant printed kurti with matching palazzo pants for casual wear.",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    category: categoryMap["Clothing"],
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
    brand: "StyleIndia",
    rating: 4.4,
    reviews: 198,
    inStock: true,
    isFeatured: true,
    isActive: true,
  },

  // ================= BOOKS =================
  {
    name: "Atomic Habits",
    slug: "atomic-habits",
    description:
      "An easy and proven way to build good habits and break bad ones.",
    price: 349,
    originalPrice: 499,
    discount: 30,
    category: categoryMap["Books"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    brand: "Penguin",
    rating: 4.9,
    reviews: 2048,
    inStock: true,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "JavaScript: The Good Parts",
    slug: "javascript-the-good-parts",
    description:
      "Classic guide to best JavaScript features by Douglas Crockford.",
    price: 449,
    originalPrice: 699,
    discount: 36,
    category: categoryMap["Books"],
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    brand: "O'Reilly",
    rating: 4.8,
    reviews: 1024,
    inStock: true,
    isFeatured: false,
    isActive: true,
  },

  // ================= HOME & KITCHEN =================
  {
    name: "Stainless Steel Water Bottle",
    slug: "stainless-steel-water-bottle",
    description:
      "Double-wall insulated bottle keeps drinks cold 24h and hot 12h.",
    price: 599,
    originalPrice: 999,
    discount: 40,
    category: categoryMap["Home & Kitchen"],
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    brand: "HydroLife",
    rating: 4.6,
    reviews: 789,
    inStock: true,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Non-Stick Cookware Set",
    slug: "non-stick-cookware-set",
    description:
      "5-piece premium cookware set with glass lids for all cooktops.",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    category: categoryMap["Home & Kitchen"],
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    brand: "KitchenPro",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    isFeatured: false,
    isActive: true,
  },

  // ================= SPORTS =================
  {
    name: "Yoga Mat Premium",
    slug: "yoga-mat-premium",
    description:
      "Extra thick 6mm non-slip yoga mat with eco-friendly material.",
    price: 799,
    originalPrice: 1299,
    discount: 38,
    category: categoryMap["Sports"],
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    brand: "FitLife",
    rating: 4.5,
    reviews: 423,
    inStock: true,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Running Shoes Men",
    slug: "running-shoes-men",
    description:
      "Lightweight breathable running shoes with cushioned sole.",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    category: categoryMap["Sports"],
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    brand: "SpeedRun",
    rating: 4.4,
    reviews: 612,
    inStock: true,
    isFeatured: true,
    isActive: true,
  },
];

// ─── Seed Function ───────────────────────────────────────────────────────────

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared existing data");

    const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    await User.create({ ...adminUser, password: hashedPassword });
    console.log("Admin user created");

    const createdCategories = await Category.insertMany(categories);

    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });
    console.log("Categories created");

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