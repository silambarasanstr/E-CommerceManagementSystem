export type CheckboxFilter = {
  id: string;
  label: string;
  count?: number;
};

export const CATEGORIES: CheckboxFilter[] = [
  { id: "electronics", label: "Electronics", count: 2340 },
  { id: "clothing", label: "Clothing", count: 180 },
  { id: "books", label: "Books", count: 640 },
  { id: "home-kitchen", label: "Home & Kitchen", count: 320 },
  { id: "sports", label: "Sports", count: 320 },
];
