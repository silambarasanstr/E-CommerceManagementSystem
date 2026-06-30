import { useEffect, useState } from "react";
import NavBarItems from "./NavBarItems";
import fash from "../../assets/micon3.webp";

import elct from "../../assets/micon6.webp";
import sport from "../../assets/micon8.webp";
import Home from "../../assets/micon5.webp";
import prod from "../../assets/micon1.webp";
import book from "../../assets/micon9.webp";

import { getCategories } from "../../services/categoryServices";
import type { CategoryType } from "../../types/category";

const NavBar = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const categoryImageMap: Record<string, string> = {
    Clothing: fash,
    Books: book,
    Electronics: elct,
    "Home & Kitchen": Home,
    Sports: sport,
  };

  const staticItems = [
    {
      id: "product",
      label: "Products",
      href: "/product",
      img: prod,
    },
    {
      id: "all-category",
      label: "All Category",
      href: "/category",
      img: fash,
    },
  ];

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const categoryItems = [
    "Clothing",
    "Books",
    "Electronics",
    "Home & Kitchen",
    "Sports",
  ].map((name, index) => {
    const slug = slugify(name);

    return {
      id: String(index + 1),
      label: name,
      slug, // 👈 new field
      href: `/category/${slug}`,
      img: categoryImageMap[name] || fash,
    };
  });

  // ✅ REMOVE DUPLICATES (IMPORTANT FIX)
  const mergedItems = [...staticItems, ...categoryItems];

  const navItems = Array.from(
    new Map(mergedItems.map((item) => [item.label, item])).values(),
  );

  return <NavBarItems items={navItems} categories={categories} />;
};

export default NavBar;
