import { ShoppingCart, Star, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../component/ui/button";
import WishlistEmpty from "../component/wishlist/WishlistEmpty";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { removeFromWishlist } from "../store/slices/wishlistSlice";
import { useCallback } from "react";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { items, itemCount } = useAppSelector((state) => state.wishlist);

  // ✅ Function to remove a single item
  const handleRemoveItem = useCallback(
    (_id: string) => {
      const id = _id;
      dispatch(removeFromWishlist(id));
    },
    [dispatch],
  );

  // ✅ Show empty state if wishlist is empty
  if (items.length === 0) {
    return <WishlistEmpty />;
  }

  return (
    <div className="px-6 py-5">
      <h2 className="mb-2 text-2xl font-semibold">My Wishlist</h2>

      <p className="mb-2 text-muted-foreground">
        {itemCount} {itemCount === 1 ? "item" : "items"} saved
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 ">
        {items.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden bg-white border border-gray-300 "
          >
            {/* Product Image */}
            <div className="relative">
              <Link to={`/product/${item._id}`}>
                {item?.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-40 bg-white"
                  />
                ) : (
                  <div className="flex items-center justify-center h-56">
                    No Image
                  </div>
                )}
              </Link>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="absolute z-10 p-2 transition bg-white rounded-full shadow cursor-pointer top-3 right-3 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>

              {/* discount Price Badge */}
              <div className="absolute top-2 left-2 text-[11px] font-medium bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                ₹{item.discount} % off
              </div>

              {/* Stock Status */}
              {!item.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-md">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between p-4">
              <div>
                <h3 className="mb-2 font-semibold line-clamp-1 ">
                  {item.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="inline-flex items-center gap-1 px-2 py-1 text-xs text-white bg-green-600 rounded">
                    {item.rating}
                    <Star className="w-3 h-3 fill-white" />
                  </div>

                  <span className="text-sm text-gray-500">
                    {item.reviews} Reviews
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-bold ">₹{item.price}</span>

                  <span className="text-sm text-gray-400 line-through">
                    ₹{item.originalPrice}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                disabled={!item.inStock}
                className="flex items-center justify-center w-full gap-2 py-2 text-white bg-[#3e3e3e]"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>

              <p className="mt-3 text-xs text-gray-600">
                Added {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
