import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBanks,
  createBank,
  updateBank,
  deleteBank,
} from "../store/slices/bankSlice";
import BankModal from "../components/BankModal";
import Toast from "../components/Toast";

export default function Bank() {
  const dispatch = useDispatch();
  const { banks, loading, error } = useSelector((state) => state.banks);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    ifsc: "",
    branch: "",
    accountNumber: "",
    description: "",
    balance: 0,
  });
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [toast, setToast] = useState(null);

  useEffect(() => {
    dispatch(fetchBanks());
  }, [dispatch]);

  const handleOpenModal = (bank = null) => {
    if (bank) {
      setEditId(bank._id);
      setFormData(bank);
    } else {
      setEditId(null);
      setFormData({
        name: "",
        type: "",
        ifsc: "",
        branch: "",
        accountNumber: "",
        description: "",
        balance: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleSubmit = async () => {
    if (editId) {
      await dispatch(updateBank({ id: editId, data: formData }));
      setToast({ type: "success", message: "Bank updated successfully!" });
    } else {
      await dispatch(createBank(formData));
      setToast({ type: "success", message: "Bank created successfully!" });
    }

    // Delay modal close slightly to allow toast to render
    setTimeout(() => setIsModalOpen(false), 200);
  };



  const handleDelete = (id) => {
    dispatch(deleteBank(id));
  };

  const paginatedBanks = banks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bank Accounts</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => handleOpenModal()}
        >
          Add Bank
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">IFSC</th>
              <th className="p-2 border">Branch</th>
              <th className="p-2 border">Account #</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Balance</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBanks.map((bank) => (
              <tr key={bank._id} className="text-sm">
                <td className="p-2 border">{bank.name}</td>
                <td className="p-2 border">{bank.type}</td>
                <td className="p-2 border">{bank.ifsc}</td>
                <td className="p-2 border">{bank.branch}</td>
                <td className="p-2 border">{bank.accountNumber}</td>
                <td className="p-2 border">{bank.description}</td>
                <td className="p-2 border">{bank.balance}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 rounded"
                    onClick={() => handleOpenModal(bank)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(bank._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{currentPage}</span>
        <button
          disabled={currentPage * itemsPerPage >= banks.length}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <BankModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        editMode={!!editId}
      />
    </div>
  );
}
