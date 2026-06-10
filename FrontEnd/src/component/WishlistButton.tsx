import React, { useMemo } from "react";
import Button from "./ui/button";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addToWhislist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import type { ProductType } from "../types/product";

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
        addToWhislist({ ...product, dateAdded: new Date().toISOString() }),
      );
    }
  };

  return (
    <Button
      onClick={toggleWishlist}
      className={`border border-[#e5e7eb] text-sm px-2 py-2 rounded-md flex items-center gap-2 ${
        isInWishlist ? "text-red-500 hover:text-red-600" : ""
      }`}
    >
      <Heart
        className={`w-4 h-4 ${showText ? "mr-1" : ""} ${
          isInWishlist ? "fill-current" : ""
        }`}
      />
      {showText && (isInWishlist ? "Remove Wishlist" : "Add Wishlist")}
    </Button>
  );
};

export default WishlistButton;