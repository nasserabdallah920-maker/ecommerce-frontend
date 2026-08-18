import { useState } from "react";
import { MapPin, Phone, Building2 } from "lucide-react";
import CouponForm from "./CouponForm";

export default function FromDetails() {
  const [shippingAddress, setShippingAddress] = useState({
    city: "",
    street: "",
    phone: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });

  const inputs = [
    {
      name: "city",
      label: "City / Governorate",
      value: shippingAddress.city,
      placeholder: "Example: Cairo, Aswan...",
      icon: Building2,
      type: "text",
    },
    {
      name: "street",
      label: "Detailed Address (Street / Building / Apt)",
      value: shippingAddress.street,
      placeholder: "Example: 12 Abbas El Akkad St, Apt 4",
      icon: MapPin,
      type: "text",
    },
    {
      name: "phone",
      label: "Phone Number",
      value: shippingAddress.phone,
      placeholder: "01xxxxxxxxx",
      icon: Phone,
      type: "tel",
    },
  ];

  const inputsShow = inputs.map((input) => (
    <div key={input.name} className="flex flex-col gap-1.5">
      <label
        htmlFor={input.name}
        className="block text-xs sm:text-sm font-medium pt-3 text-gray-700 dark:text-gray-300 transition-colors"
      >
        {input.label}
      </label>

      <div className="relative group">
        <input
          id={input.name}
          name={input.name}
          type={input.type}
          value={input.value}
          onChange={onChange}
          placeholder={input.placeholder}
          className="w-full pl-4 pr-11 py-2.5 rounded-xl text-sm 
                   bg-gray-50/50 dark:bg-gray-800/50 
                   text-gray-900 dark:text-gray-100 
                   placeholder:text-gray-400 dark:placeholder:text-gray-500
                   border border-gray-200 dark:border-gray-700/80
                   hover:border-gray-300 dark:hover:border-gray-600
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500
                   shadow-sm transition-all duration-200"
        />

        <input.icon
          className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 
                   text-gray-400 group-focus-within:text-indigo-500 
                   pointer-events-none transition-colors duration-200"
        />
      </div>
    </div>
  ));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-100 transition-colors dir-rtl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
        Complete Order (Checkout)
      </h1>
      <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Shipping Address
            </h2>
            {inputsShow}
          </div>
        </div>

        <CouponForm shippingAddress={shippingAddress} />
      </form>
    </div>
  );
}
