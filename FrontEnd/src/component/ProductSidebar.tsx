import Checkbox from "./ui/checkbox";
import { useState } from "react";
import SectionHeader from "./ui/SectionHeader";

type FilterSection = {
  id: string;
  title: string;
};

type CheckboxFilter = {
  id: string;
  label: string;
  count?: number;
};

const CATEGORIES: CheckboxFilter[] = [
  { id: "electronics", label: "Electronics", count: 2340 },
  { id: "clothing", label: "Clothing", count: 180 },
  { id: "books", label: "Books", count: 640 },
  { id: "home-kitchen", label: "Home & Kitchen", count: 320 },
  { id: "sports", label: "Sports", count: 320 },
];

const SECTIONS: FilterSection[] = [
  { id: "category", title: "Category" },
  { id: "price", title: "Price" },
  { id: "rating", title: "Customer Ratings" },
  { id: "discount", title: "Discount" },
  { id: "brand", title: "Brand" },
  { id: "availability", title: "Availability" },
];

const ProductSidebar = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(SECTIONS.map((s) => s.id)),
  );

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );

  function toggleSection(id: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleSet(
    set: Set<string>,
    setFn: React.Dispatch<React.SetStateAction<Set<string>>>,
    id: string,
    checked: boolean,
  ) {
    const next = new Set(set);
    checked ? next.add(id) : next.delete(id);
    setFn(next);
  }

  return (
    <aside className="w-full px-4 py-3 overflow-hidden bg-white border border-gray-200 rounded-xl h-fit">
      <div>
        <h2 className="font-semibold text-[15px]">Filters</h2>
      </div>

      {/* Category */}
      <div className="px-4 text-sm border-b border-gray-100">
        <SectionHeader
          title="Category"
          open={openSections.has("category")}
          onToggle={() => toggleSection("category")}
        />

        {openSections.has("category") && (
          <div className="pb-3 space-y-0.5">
            {CATEGORIES.map((cat) => (
              <Checkbox
                key={cat.id}
                id={`cat-${cat.id}`}
                label={cat.label}
                checked={selectedCategories.has(cat.id)}
                onChange={(v) =>
                  toggleSet(
                    selectedCategories,
                    setSelectedCategories,
                    cat.id,
                    v,
                  )
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="px-4 text-sm border-b border-gray-100">
        <SectionHeader
          title="Price"
          open={openSections.has("price")}
          onToggle={() => toggleSection("price")}
        />
        {openSections.has("price") && (
          <div className="pb-3 space-y-0.5">Price Range</div>
        )}
      </div>

      {/* Customer Ratings */}

      <div className="px-4 text-sm border-b border-gray-100">
        <SectionHeader
          title="Customer Ratings"
          open={openSections.has("rating")}
          onToggle={() => toggleSection("rating")}
        />

        {openSections.has("rating") && (
          <div className="pb-3 space-y-0.5">Ratings</div>
        )}
      </div>

      {/* Discount */}
      <div className="px-4 text-sm border-b border-gray-100">
        <SectionHeader
          title="Discount"
          open={openSections.has("discount")}
          onToggle={() => toggleSection("discount")}
        />

        {openSections.has("discount") && (
          <div className="pb-3 space-y-0.5">discount</div>
        )}
      </div>

      {/* Brand */}
      <div className="px-4 text-sm border-b border-gray-100">
        <SectionHeader
          title="Brand"
          open={openSections.has("brand")}
          onToggle={() => toggleSection("brand")}
        />

        {openSections.has("brand") && (
          <div className="pb-3 space-y-0.5">brand</div>
        )}
      </div>

      {/* Availability */}
      <div className="px-4 text-sm">
        <SectionHeader
          title="Availability"
          open={openSections.has("availability")}
          onToggle={() => toggleSection("availability")}
        />

        {openSections.has("availability") && (
          <div className="pb-3 space-y-0.5">Availability</div>
        )}
      </div>
    </aside>
  );
};

export default ProductSidebar;
