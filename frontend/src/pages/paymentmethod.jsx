import React, { useEffect, useState } from "react";
import Toast from "../components/Toast"; // ✅ import your toast
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from "../store/slices/paymentMethodSlice";
import PaymentMethodModal from "../components/PaymentMethodModal";

export default function PaymentMethodPage() {
  const dispatch = useDispatch();
  const { paymentMethods, loading, error } = useSelector((state) => state.paymentMethods);

  const [formData, setFormData] = useState({
    methodType: "",
    bankAccount: "",
    details: {},
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast({ message: "", type: "success" });
  };

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, [dispatch]);

  const handleOpenModal = (method = null) => {
    if (method) {
      setEditId(method._id);
      setFormData({
        methodType: method.methodType,
        bankAccount: method.bankAccount,
        details: method.details || {},
      });
    } else {
      setEditId(null);
      setFormData({ methodType: "", bankAccount: "", details: {} });
    }
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const errs = {};
    if (!formData.methodType) errs.methodType = "Required";
    if (!formData.bankAccount) errs.bankAccount = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      showToast("Please fix form errors", "error");
      return;
    }

    const action = editId
      ? updatePaymentMethod({ id: editId, data: formData })
      : createPaymentMethod(formData);

    dispatch(action)
      .unwrap()
      .then(() => {
        showToast(editId ? "Payment Method Updated!" : "Payment Method Added!");
        setModalOpen(false);
      })
      .catch((err) => {
        showToast("Failed to save. Try again.", "error");
      });
  };

  const handleDelete = (id) => {
    dispatch(deletePaymentMethod(id))
      .unwrap()
      .then(() => showToast("Deleted successfully"))
      .catch(() => showToast("Failed to delete", "error"));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleOpenModal()}>
          + Add
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border mt-4 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Bank Account</th>
            <th className="p-2 border">Details</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((pm) => (
            <tr key={pm._id} className="border-t">
              <td className="p-2 border">{pm.methodType}</td>
              <td className="p-2 border">{pm.bankAccount.name}</td>
              <td className="p-2 border text-xs">
                {Object.entries(pm.details || {}).map(([key, val]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {val}
                  </div>
                ))}
              </td>
              <td className="p-2 border">
                <div className="flex gap-2">
                  <button className="text-blue-600" onClick={() => handleOpenModal(pm)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDelete(pm._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        editMode={!!editId}
        errors={errors}
      />

      {toast.message && (
        <Toast type={toast.type} message={toast.message} onClose={clearToast} />
      )}
    </div>
  );
}
