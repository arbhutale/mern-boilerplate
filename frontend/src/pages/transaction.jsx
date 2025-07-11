import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../store/slices/transactionSlice";
import {
  fetchCategories
} from "../store/slices/categorySlice";
import TransactionModal from "../components/TransactionModal";
import Toast from "../components/Toast";

export default function TransactionPage() {
  const dispatch = useDispatch();
  const { transactions, total, page, limit, loading, error } = useSelector((state) => state.transactions);
  const { categories } = useSelector((state) => state.categories);

  const [filters, setFilters] = useState({
    category: "",
    from: "",
    to: "",
    page: 1,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTransactions(filters));
  }, [dispatch, filters]);

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handleEdit = (tx) => {
    setEditData(tx);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) {
      dispatch(deleteTransaction(id));
      setToast({ type: "success", message: "Deleted!" });
    }
  };

  const handleSave = (data) => {
    if (editData) {
      dispatch(updateTransaction({ id: editData._id, data }));
      setToast({ type: "success", message: "Updated!" });
    } else {
      dispatch(createTransaction(data));
      setToast({ type: "success", message: "Added!" });
    }
    setModalOpen(false);
    setEditData(null);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          {/* Add real category options here */}
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="from"
          value={filters.from}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          name="to"
          value={filters.to}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border text-sm mb-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Source</th>
            <th className="p-2 border">Source Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td className="p-2 border">{tx.amount}</td>
              <td className="p-2 border">{tx.transactionType}</td>
              <td className="p-2 border">{new Date(tx.date).toLocaleDateString()}</td>
              <td className="p-2 border">{tx.sourceType}</td>
              <td className="p-2 border">{tx.source?.name || tx.source?._id}</td>
              <td className="p-2 border">{tx.category?.name || "-"}</td>
              <td className="p-2 border">{tx.description}</td>
              <td className="p-2 border">
                <button onClick={() => handleEdit(tx)} className="text-blue-600">
                  Edit
                </button>
                <button onClick={() => handleDelete(tx._id)} className="text-red-600 ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              filters.page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editData}
        onSubmit={handleSave}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
