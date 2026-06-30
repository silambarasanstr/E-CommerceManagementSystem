import React from "react";
import PaymentOptionField from "./PaymentOptionField";
import type { PaymentMethodType } from "../../types/payment";

type Props = {
  paymentMethod: PaymentMethodType;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodType>>;
};

const PaymentPage = ({ paymentMethod, setPaymentMethod }: Props) => {
  return (
    <div className="bg-white border border-gray-200">
      <h2 className="p-4 font-semibold border-b border-gray-200">Payment</h2>
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
        <PaymentOptionField
          value="cod"
          selectedValue={paymentMethod}
          title="Cash on Delivery"
          description="Pay when your order arrives"
          icon="💵"
          onChange={setPaymentMethod}
        />

        <PaymentOptionField
          value="online"
          selectedValue={paymentMethod}
          title="Online Payment"
          description="UPI, Card, Net Banking"
          icon="💳"
          onChange={setPaymentMethod}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
