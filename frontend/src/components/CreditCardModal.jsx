// CreditCardModal.jsx
import React, { useEffect, useState } from "react";

export default function CreditCardModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  handleSubmit,
  editMode,
  setToast,
}) {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) setErrors({});
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.number) newErrors.number = "Card number is required";
    if (!formData.expiry) newErrors.expiry = "Expiry date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";
    if (!formData.limit) newErrors.limit = "Limit is required";
    if (!formData.balance) newErrors.balance = "Balance is required";
    if (!formData.description) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onFormSubmit = () => {
    if (validate()) {
      handleSubmit();
      setToast({
        type: "success",
        message: `${editMode ? "Updated" : "Added"} successfully!`,
      });
    } else {
      setToast({
        type: "error",
        message: "Please fix the form errors.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h2 className="text-xl font-semibold mb-4">
          {editMode ? "Update Credit Card" : "Add Credit Card"}
        </h2>

        {/* All input fields with labels and validation */}
        {[
          { label: "Cardholder Name", name: "name", type: "text" },
          { label: "Card Number", name: "number", type: "text" },
          { label: "Expiry Date (MM/YY)", name: "expiry", type: "text" },
          { label: "CVV", name: "cvv", type: "text" },
          { label: "Credit Limit", name: "limit", type: "number" },
          { label: "Balance", name: "balance", type: "number" },
        ].map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              value={formData[name]}
              onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
              className="w-full p-2 border rounded"
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows={2}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onFormSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editMode ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
