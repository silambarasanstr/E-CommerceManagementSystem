import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
};

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryName) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:4001/category/${categoryName}`,
        );

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-4 rounded-full animate-spin border-t-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl px-4 py-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">{categoryName}</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product._id} className="p-3 border rounded">
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
