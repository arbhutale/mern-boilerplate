import React, { useEffect } from "react";
import { fetchBanks } from "../store/slices/bankSlice";
import { useDispatch, useSelector } from "react-redux";
export default function PaymentMethodModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  editMode,
  errors,
}) {

  const dispatch = useDispatch();
  const { banks } = useSelector((state) => state.banks);
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchBanks());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDetailsChange = (field, value) => {
    setFormData({
      ...formData,
      details: { ...formData.details, [field]: value },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {editMode ? "Edit" : "Add"} Payment Method
        </h2>

        {/* Method Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Method Type</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={formData.methodType}
            onChange={(e) =>
              setFormData({ ...formData, methodType: e.target.value })
            }
          >
            <option value="">Select</option>
            <option value="DEBIT_CARD">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="NET_BANKING">Net Banking</option>
            <option value="CASH">Cash</option>
            <option value="CHEQUE">Cheque</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.methodType && (
            <p className="text-red-500 text-xs mt-1">{errors.methodType}</p>
          )}
        </div>

        {/* Bank Account */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Bank Account</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={formData.bankAccount}
            onChange={(e) =>
              setFormData({ ...formData, bankAccount: e.target.value })
            }
          >
            <option value="">Select</option>
            {banks.map((bank) => (
              <option key={bank._id} value={bank._id}>
                {bank.name}
              </option>
            ))}
          </select>
          {errors.bankAccount && (
            <p className="text-red-500 text-xs mt-1">{errors.bankAccount}</p>
          )}
        </div>

        {/* Details */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={formData.details?.number || ""}
            onChange={(e) => handleDetailsChange("number", e.target.value)}
            placeholder="Enter number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Expiry</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={formData.details?.expiry || ""}
            onChange={(e) => handleDetailsChange("expiry", e.target.value)}
            placeholder="Enter expiry"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Secure</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={formData.details?.secure || ""}
            onChange={(e) => handleDetailsChange("secure", e.target.value)}
            placeholder="Enter secure code"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={formData.details?.desc || ""}
            onChange={(e) => handleDetailsChange("desc", e.target.value)}
            placeholder="Enter description"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editMode ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
