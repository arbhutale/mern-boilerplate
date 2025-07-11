// components/LoanAccountModal.jsx
import React, { useEffect, useState } from "react";
export default function LoanAccountModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
}) {
  const [form, setForm] = useState({
    principal: "",
    roi: "",
    termMonths: "",
    startDate: "",
    bankAccount: "",
  });
useEffect(() => {
    if (initialData) {
      setForm({
        principal: initialData.principal || "",
        roi: initialData.roi || "",
        termMonths: initialData.termMonths || "",
        startDate: initialData.startDate?.slice(0, 10) || "",
        bankAccount: initialData.bankAccount || "",
      });
    }
  }, [initialData]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.principal) errs.principal = "Required";
    if (!form.roi) errs.roi = "Required";
    if (!form.termMonths) errs.termMonths = "Required";
    if (!form.startDate) errs.startDate = "Required";
    if (!form.bankAccount) errs.bankAccount = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(form);
      onClose();
      setForm({ principal: "", roi: "", termMonths: "", startDate: "", bankAccount: "" });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Add Loan Account</h2>
        {["principal", "roi", "termMonths", "startDate", "bankAccount"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type={field === "startDate" ? "date" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-blue-600 text-white rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
