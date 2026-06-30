import React from "react";
import InputField from "../ui/InputField";
import type { ShippingTypes } from "../../types/shipping";

type Props = {
  shippingDetails: ShippingTypes;
  setShippingDetails: React.Dispatch<React.SetStateAction<ShippingTypes>>;
};

const ShippingPage = ({ shippingDetails, setShippingDetails }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white border border-gray-200">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
        <span className="flex items-center justify-center text-sm font-bold text-green-600 rounded-full w-7 h-7 bg-green-50">
          1
        </span>
        <h2 className="text-base font-semibold text-gray-800">
          Delivery Address
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 p-6">
        <InputField
          className="col-span-2"
          label="Full Name"
          name="fullName"
          placeholder="Enter full name"
          value={shippingDetails.fullName}
          onChange={handleChange}
        />

        <InputField
          className="col-span-2"
          label="Street Address"
          name="street"
          placeholder="Enter street "
          value={shippingDetails.street}
          onChange={handleChange}
        />

        <InputField
          label="City"
          name="city"
          placeholder="Enter city"
          value={shippingDetails.city}
          onChange={handleChange}
        />

        <InputField
          label="Pincode"
          name="pincode"
          placeholder="Enter pincode"
          value={shippingDetails.pincode}
          onChange={handleChange}
        />

        <InputField
          className="col-span-2"
          type="tel"
          label="Phone Number"
          name="phone"
          placeholder="Enter phone number"
          value={shippingDetails.phone}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ShippingPage;
