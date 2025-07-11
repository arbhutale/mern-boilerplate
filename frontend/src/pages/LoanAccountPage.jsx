import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoanAccountModal from "../components/LoanAccountModal";
import Toast from "../components/Toast";
import {
  fetchLoanAccounts,
  createLoanAccount,
  updateLoanAccount,
  deleteLoanAccount,
} from "../store/slices/loanAccountSlice";

export default function LoanAccountPage() {
  const dispatch = useDispatch();
  const { loanAccounts, loading, error } = useSelector((state) => state.loanAccounts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLoan, setEditLoan] = useState(null);
  const [toast, setToast] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    dispatch(fetchLoanAccounts());
  }, [dispatch]);

  const handleCreate = (data) => {
    if (editLoan) {
      dispatch(updateLoanAccount({ id: editLoan._id, data }));
      setToast({ type: "success", message: "Loan updated!" });
    } else {
      dispatch(createLoanAccount(data));
      setToast({ type: "success", message: "Loan created!" });
    }
    setIsModalOpen(false);
    setEditLoan(null);
  };

  const handleEdit = (loan) => {
    setEditLoan(loan);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this loan account?")) {
      dispatch(deleteLoanAccount(id));
      setToast({ type: "success", message: "Deleted successfully!" });
    }
  };

  const toggleEmi = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-bold">Loan Accounts</h2>
        <button
          onClick={() => {
            setEditLoan(null);
            setIsModalOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Loan
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Principal</th>
              <th className="p-2">ROI</th>
              <th className="p-2">Term</th>
              <th className="p-2">Start Date</th>
              <th className="p-2">Bank</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loanAccounts.map((loan) => (
              <React.Fragment key={loan._id}>
                <tr className="border-t">
                  <td className="p-2">{loan.principal}</td>
                  <td className="p-2">{loan.roi}%</td>
                  <td className="p-2">{loan.termMonths}</td>
                  <td className="p-2">{new Date(loan.startDate).toLocaleDateString()}</td>
                  <td className="p-2">{loan.bankAccount?.name || "N/A"}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(loan)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(loan._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toggleEmi(loan._id)}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      {expandedId === loan._id ? "Hide EMI" : "Show EMI"}
                    </button>
                  </td>
                </tr>
                {expandedId === loan._id && loan.emiSchedule?.length > 0 && (
                  <tr>
                    <td colSpan={6}>
                      <div className="bg-gray-100 p-2">
                        <table className="w-full text-sm">
                          <thead>
                            <tr>
                              <th className="p-1">Due Date</th>
                              <th className="p-1">Amount</th>
                              <th className="p-1">Paid</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loan.emiSchedule.map((emi, i) => (
                              <tr key={i}>
                                <td className="p-1">{new Date(emi.dueDate).toLocaleDateString()}</td>
                                <td className="p-1">{emi.amount}</td>
                                <td className="p-1">
                                  {emi.isPaid ? "✅" : "❌"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <LoanAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        initialData={editLoan}
      />

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
