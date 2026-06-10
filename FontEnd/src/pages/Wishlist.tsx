import { ShoppingCart, Star, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../component/ui/button";

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
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Wishlist</h2>
          <p className="mb-6 text-muted-foreground">
            Your wishlist is currently empty.
          </p>

          <Link
            to="/"
            className="text-white bg-[#3e3e3e] px-4 py-2 rounded-md mt-2"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-5">
      <h2 className="mb-5 text-2xl font-semibold">My Wishlist</h2>

      <p className="mb-2 text-muted-foreground">
        {itemCount} {itemCount === 1 ? "item" : "items"} saved
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-md shadow-md">
            <div className="relative">
              <Link to={`/product/${item._id}`}>
                {item?.image ? (
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:4000${item.image}`
                    }
                    alt={item.name}
                    className="object-contain w-full h-48 p-3 mb-4 border border-gray-200 "
                  />
                ) : (
                  <span>No Image</span>
                )}
              </Link>

              <button
                onClick={() => handleRemoveItem(item._id)}
                className="absolute p-2 transition-all rounded-full shadow-md cursor-pointer top-2 right-2 bg-white/90 hover:bg-white"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>

              {/* ✅ Discount badge */}

              <div className="absolute px-2 py-1 text-xs font-bold rounded-md top-2 left-2 bg-accent text-accent-foreground">
                ₹ {item.originalPrice}
              </div>

              <div
                className={` ${
                  item.inStock ? "hidden" : ""
                }  absolute inset-0 bg-black/50 flex items-center justify-center`}
              >
                {item.inStock ? (
                  <div className="px-2 py-1 text-xs font-bold text-white bg-green-600 rounded-md ">
                    In Stock
                  </div>
                ) : (
                  <div className="px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-md ">
                    Out of Stock
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 py-4">
              <h3 className="mb-2 font-semibold text-foreground">
                {item.name}
              </h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <span className="ml-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="text-[12px] font-medium px-2 py-0.5 bg-green-600 items-center text-white rounded inline-flex  gap-1">
                        <span>{item?.rating}</span>
                        <Star className={`h-3 w-3 gap-2 fill-white`} />
                      </div>

                      <div className="text-[14px] font-medium text-[#878787]">
                        {item?.reviews} Reviews
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <div className="flex items-center pt-2 mb-1 space-x-4">
                <span className="text-lg font-bold text-foreground">
                  ₹{item?.price}
                </span>
                <span className="text-base text-[#878787] line-through">
                  ₹ {item?.originalPrice}
                </span>
              </div>
            </div>

            <div className="px-4 ">
              <Button className="text-white bg-[#3e3e3e] flex items-center justify-center w-full py-2 rounded-md mt-2 ">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            <p className="px-4 py-2 text-xs text-muted-foreground">
              Added {new Date().toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
