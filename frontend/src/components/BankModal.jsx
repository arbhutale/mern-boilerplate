import React, { useState } from "react";

export default function BankModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  handleSubmit,
  editMode,
}) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = "Name is required.";
    if (!formData.type) errs.type = "Type is required.";
    if (!formData.ifsc) errs.ifsc = "IFSC is required.";
    if (!formData.branch) errs.branch = "Branch is required.";
    if (!formData.accountNumber) errs.accountNumber = "Account number is required.";
    if (!formData.description) errs.description = "Description is required.";
    if (formData.balance === "" || isNaN(formData.balance)) errs.balance = "Balance must be a number.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onFormSubmit = async () => {
  if (validate()) {
    await handleSubmit(); // if it's async
  }
};

  if (!isOpen) return null;

  return (
    <>
    

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-xl rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">{editMode ? "Update Bank" : "Add Bank"}</h2>

          {/* Input fields */}
          {[
            { label: "Bank Name", key: "name" },
            { label: "Type", key: "type" },
            { label: "IFSC", key: "ifsc" },
            { label: "Branch", key: "branch" },
            { label: "Account Number", key: "accountNumber" },
            { label: "Description", key: "description" },
          ].map(({ label, key }) => (
            <div className="mb-4" key={key}>
              <label className="block font-medium">{label}</label>
              <input
                type="text"
                className={`w-full border p-2 rounded ${errors[key] ? "border-red-500" : "border-gray-300"}`}
                value={formData[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              />
              {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
            </div>
          ))}

          {/* Balance Field */}
          <div className="mb-4">
            <label className="block font-medium">Balance</label>
            <input
              type="number"
              className={`w-full border p-2 rounded ${errors.balance ? "border-red-500" : "border-gray-300"}`}
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
            />
            {errors.balance && <p className="text-red-500 text-sm mt-1">{errors.balance}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button onClick={onFormSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
              {editMode ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
