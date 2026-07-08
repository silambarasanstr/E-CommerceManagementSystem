import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { clearCart } from "../store/slices/cartSlice";

import toast from "react-hot-toast";

import CheckoutEmpty from "../component/checkout/CheckoutEmpty";

import type { ShippingTypes } from "../types/shipping";

import type { PaymentMethodType } from "../types/payment";

import OrderSummary from "../component/checkout/OrderSummary";
import ShippingPage from "../component/checkout/ShippingPage";
import PaymentPage from "../component/checkout/PaymentPage";

import { createOrder } from "../services/orderService";

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, grandTotal } = useAppSelector((state) => state.cart);

  const [shippingDetails, setShippingDetails] = useState<ShippingTypes>({
    fullName: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cod");
  const [loading, setLoading] = useState(false);

  // const handlePlaceOrder = async () => {
  //   setLoading(true);

  //   try {
  //     const orderId = uuidv4();

  //     const order: OrderType = {
  //       id: orderId,
  //       items,
  //       total,
  //       grandTotal,
  //       date: new Date().toISOString(),
  //       status: "pending",
  //       shippingDetails,
  //       paymentMethod,
  //     };

  //     console.log("orderData =>", JSON.stringify(order, null, 2));

  //     dispatch(placeOrder(order));
  //     dispatch(clearCart());

  //     toast.success("Order placed successfully!");
  //     navigate(`/order-success/${orderId}`);
  //   } catch (error) {
  //     toast.error("Something went wrong. Please try again.");
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const response = await createOrder({
        shippingAddress: shippingDetails,
        paymentMethod,
      });

      console.log(response);

      dispatch(clearCart());

      toast.success("Order placed successfully!");

      navigate(`/order-success/`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <CheckoutEmpty />;
  }

  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            <ShippingPage
              shippingDetails={shippingDetails}
              setShippingDetails={setShippingDetails}
            />

            <PaymentPage
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>

          {/* RIGHT SIDE */}
          <OrderSummary
            items={items}
            grandTotal={grandTotal}
            loading={loading}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
