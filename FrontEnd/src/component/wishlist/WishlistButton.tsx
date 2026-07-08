import React, { useMemo } from "react";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice";
import type { ProductType } from "../../types/product";

type WishlistButtonProps = {
  product: ProductType;
  showText?: boolean;
};

const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  showText = false,
}) => {
  const dispatch = useAppDispatch();

  const wishlistItems = useAppSelector((state) => state.wishlist.items || []);

  const isInWishlist = useMemo(
    () =>
      Array.isArray(wishlistItems) &&
      wishlistItems.some((item) => item._id === product._id),
    [wishlistItems, product._id],
  );

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(
        addToWishlist({
          ...product,
          dateAdded: new Date().toISOString(),
        }),
      );
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex items-center gap-1.5 rounded-full transition-all duration-200 active:scale-90
        ${showText ? "px-3 py-1.5 text-sm border" : "p-2"}
        ${
          isInWishlist
            ? "text-red-500 border-red-200 bg-red-50 hover:bg-red-100"
            : "text-gray-400 border-gray-200 bg-white/80 hover:text-red-400 hover:bg-red-50 hover:border-red-200"
        }`}
    >
      <Heart
        className={`w-4 h-4 transition-all duration-200 ${isInWishlist ? "fill-red-500 text-red-500 scale-110" : ""}`}
      />
      {showText && (
        <span className="font-medium">
          {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
        </span>
      )}
    </button>
  );
};

export default WishlistButton;
