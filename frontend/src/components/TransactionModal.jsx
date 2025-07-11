// components/TransactionModal.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentMethods } from "../store/slices/paymentMethodSlice";
import {
    fetchCategories,
    fetchSubcategories,
} from "../store/slices/categorySlice";
import {
    fetchCreditCards,
} from "../store/slices/creditCardSlice";

export default function TransactionModal({ isOpen, onClose, initialData, onSubmit }) {
    const [formData, setFormData] = useState({
        amount: 100,
        transactionType: "DEBIT",
        date: "",
        description: "",
        sourceType: "BANK_ACCOUNT",
        sourceTypeRef: "BankAccount",
        sourceId: "",
        category: "",
        subcategory: "",
        paymentMethod: null,
    });
    const { paymentMethods } = useSelector((state) => state.paymentMethods);
    const { creditCards } = useSelector((state) => state.creditCards);
    const dispatch = useDispatch();
    const { categories, subcategories } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchPaymentMethods());
        if (initialData) {
            setFormData({ ...initialData });
        } else {
            setFormData({
                amount: 100,
                transactionType: "DEBIT",
                date: new Date().toISOString().slice(0, 10),
                description: "",
                sourceType: "BANK_ACCOUNT",
                sourceId: "",
                category: "",
                subcategory: "",
                paymentMethod: null,
                sourceTypeRef: "BankAccount",
            });
        }
    }, [initialData]);

    if (!isOpen) return null;
    const handleSelectCategory = (id) => {
        console.log(id)
        dispatch(fetchSubcategories(id));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">
                    {initialData ? "Edit" : "Add"} Transaction
                </h2>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        className="border p-2"
                        type="number"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                    <select
                        className="border p-2"
                        value={formData.transactionType}
                        onChange={(e) => setFormData({ ...formData, transactionType: e.target.value })}
                    >
                        <option value="DEBIT">Debit</option>
                        <option value="CREDIT">Credit</option>
                    </select>

                    <input
                        className="border p-2"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                    <input
                        className="border p-2"
                        type="text"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    <select
                        className="border p-2"
                        value={formData.sourceType}
                        onChange={(e) => {
                            if (e.target.value === "CREDIT_CARD") {
                                dispatch(fetchCreditCards());
                            }
                            setFormData({ ...formData, sourceType: e.target.value });
                        }}
                    >
                        <option value="BANK_ACCOUNT">Bank</option>
                        <option value="CREDIT_CARD">Credit Card</option>
                        <option value="LOAN_ACCOUNT">Loan</option>
                    </select>
                    {formData.sourceType === "BANK_ACCOUNT" && (
                        <select
                            className="border p-2"
                            value={formData.paymentMethod}
                            onChange={(e) => {
                                const pmObj = paymentMethods.find(cat => cat._id === e.target.value);
                                setFormData({ ...formData, paymentMethod: e.target.value, sourceId: pmObj.bankAccount._id })

                            }}>
                            <option value="">Select Payment Method</option>
                            {paymentMethods.map((pm) => (
                                <option key={pm._id} value={[pm._id]}>
                                    {pm.methodType} ({pm.bankAccount?.name || "No Bank"})
                                </option>
                            ))}
                        </select>
                    )}
                    {formData.sourceType === "CREDIT_CARD" && (
                        <select
                            className="border p-2"
                            // value={formData.paymentMethod}
                            onChange={(e) => {
                                const pmObj = paymentMethods.find(cat => cat._id === e.target.value);
                                setFormData({ ...formData, sourceId: e.target.value })
                            }}>
                            <option value="">Select Credit Card</option>
                            {creditCards.map((pm) => (
                                <option key={pm._id} value={[pm._id]}>
                                    {pm?.name || "No CC"}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* <input
                        className="border p-2"
                        type="text"
                        disabled
                        placeholder="Bank Name"
                        value={formData.sourceId}
                        onChange={(e) => setFormData({ ...formData, sourceId: e.target.value })}
                    /> */}

                    {/* <input
                        className="border p-2"
                        type="text"
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    /> */}
                    <select
                        className="border p-2"
                        value={formData.category || ""}
                        onChange={(e) => {
                            const selectedCategory = e.target.value;
                            setFormData({ ...formData, category: selectedCategory });
                            handleSelectCategory(selectedCategory); // this fetches subcategories
                            dispatch(fetchSubcategories(selectedCategory));
                            console.log(subcategories[selectedCategory] || "ll")
                        }}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <select
                        className="border p-2"
                        value={formData.subcategory || ""}
                        onChange={(e) => {
                            const selectedSubId = e.target.value;
                            const selectedSub =
                                subcategories?.[formData.category]?.find((cat) => cat._id === selectedSubId);

                            setFormData({
                                ...formData,
                                subcategory: selectedSubId,
                                subcategoryName: selectedSub?.name || "",
                            });
                        }}
                    >
                        <option value="">Select SubCategory</option>
                        {(subcategories?.[formData.category] || []).map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>


                    {/* <input
                        className="border p-2"
                        type="text"
                        placeholder="Subcategory"
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    /> */}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
                        Cancel
                    </button>
                    <button onClick={() => onSubmit(formData)} className="bg-blue-600 text-white px-4 py-2 rounded">
                        {initialData ? "Update" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}
