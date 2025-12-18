import React from "react";

const PricingForm = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData("pricing", { ...data.pricing, [name]: value });
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        E. Pricing & Offers
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Discount Price */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Discount Price
          </label>
          <input
            type="number"
            name="discount"
            placeholder="Discount Price"
            value={data.pricing.discount}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Currency */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            name="currency"
            value={data.pricing.currency}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Currency</option>
            <option>USD</option>
            <option>INR</option>
            <option>EUR</option>
          </select>
        </div>

        {/* Payment Type */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Payment Type
          </label>
          <select
            name="paymentType"
            value={data.pricing.paymentType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option>Paid</option>
            <option>Free</option>
          </select>
        </div>
      </div>

      {/* Optional info card */}
      <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-200 text-gray-700 text-sm">
        <p>Note: Setting a discount price will override the main course price for paid courses.</p>
        <p className="mt-1">For free courses, the price will automatically be set to ₹0 or equivalent currency.</p>
      </div>
    </div>
  );
};

export default PricingForm;
