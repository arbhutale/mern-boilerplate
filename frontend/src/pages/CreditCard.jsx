import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreditCards,
  createCreditCard,
  updateCreditCard,
  deleteCreditCard,
} from "../store/slices/creditCardSlice";
import CreditCardModal from "../components/CreditCardModal";
import Toast from "../components/Toast"; // Your existing toast component

export default function CreditCard() {
  const dispatch = useDispatch();
  const { creditCards, loading, error } = useSelector((state) => state.creditCards);
// let creditCards =[]
 const [formData, setFormData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    limit: 0,
    balance: 0,
    description: "",
 });

  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Or any number you prefer
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // const currentBanks = banks.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(creditCards.length / rowsPerPage);

  useEffect(() => {
    console.log("tesdddt")
    dispatch(fetchCreditCards());
  }, [dispatch]);

  const handleOpenModal = (card = null) => {
    if (card) {
      setEditId(card._id);
      setFormData(card);
    } else {
      setEditId(null);
      setFormData({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
        description: "",
        limit: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = () => {
    if (editId) {
      dispatch(updateCreditCard({ id: editId, data: formData }));
    } else {
      dispatch(createCreditCard(formData));
    }
    setToast({ type: "success", message: `${editId ? "Updated" : "Added"} successfully!` });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteCreditCard(id));
    setToast({ type: "success", message: "Deleted successfully!" });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Credit Cards</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => handleOpenModal()}
        >
          Add Credit Card
        </button>
      </div>

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Number</th>
            <th className="p-2 border">Expiry</th>
            <th className="p-2 border">CVV</th>
            <th className="p-2 border">Limit</th>
            <th className="p-2 border">Balance</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {creditCards.map((card) => (
            <tr key={card._id} className="text-center">
              <td className="border p-2">{card.name}</td>
              <td className="border p-2">{card.number}</td>
              <td className="border p-2">{card.expiry}</td>
              <td className="border p-2">{card.cvv}</td>
              <td className="border p-2">{card.limit}</td>
              <td className="border p-2">{card.balance}</td>
              <td className="border p-2">{card.description}</td>
              <td className="border p-2 space-x-2">
                <button className="text-blue-600" onClick={() => handleOpenModal(card)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(card._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
          disabled={currentPage * rowsPerPage >= creditCards.length}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <CreditCardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        editMode={!!editId}
        setToast={setToast}
      />
    </div>
  );
}
