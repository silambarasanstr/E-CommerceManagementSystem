import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

type CartEmptyProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
};

const CartEmpty = ({
  title = "Your cart is empty",
  description = "Looks like you haven't added anything yet.",
  buttonText = "Continue Shopping",
  buttonLink = "/",
}: CartEmptyProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full">
            <ShoppingCart className="text-gray-400 w-9 h-9" />
          </div>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-800">{title}</h2>

        <p className="mb-6 text-sm text-gray-500">{description}</p>

        <Link
          to={buttonLink}
          className="px-6 py-2.5 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
