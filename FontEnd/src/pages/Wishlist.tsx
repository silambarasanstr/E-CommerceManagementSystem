import { Heart, ShoppingCart, Star, Trash2 } from "lucide-react";
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
    (_id: number) => {
      const id = _id;
      dispatch(removeFromWishlist(id));
    },
    [dispatch]
  );

  // ✅ Show empty state if wishlist is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center text-center py-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Wishlist</h2>
          <p className="text-muted-foreground mb-6">
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
      <h2 className="text-2xl font-semibold mb-5">My Wishlist</h2>

      <p className="text-muted-foreground mb-2">
        {itemCount} {itemCount === 1 ? "item" : "items"} saved
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
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
                    className="mb-4 w-full p-3  h-48 object-contain border border-gray-200 "
                  />
                ) : (
                  <span>No Image</span>
                )}
              </Link>

              <button
                onClick={() => handleRemoveItem(item._id)}
                className="cursor-pointer absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>

              {/* ✅ Discount badge */}

              <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-bold">
                ₹ {item.originalPrice}
              </div>

              <div
                className={` ${
                  item.inStock ? "hidden" : ""
                }  absolute inset-0 bg-black/50 flex items-center justify-center`}
              >
                {item.inStock ? (
                  <div className=" bg-green-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                    In Stock
                  </div>
                ) : (
                  <div className="  bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                    Out of Stock
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 py-4">
              <h3 className="font-semibold text-foreground mb-2">
                {item.name}
              </h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground ml-1">
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
              <div className="flex items-center space-x-4 mb-1 pt-2">
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

            <p className="text-xs text-muted-foreground  px-4 py-2">
              Added {new Date().toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
