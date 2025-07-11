// pages/CategorySubcategoryPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../store/slices/categorySlice";

export default function CategorySubcategoryPage() {
  const dispatch = useDispatch();
  const { categories, subcategories, loading, error } = useSelector((state) => state.categories);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editSubId, setEditSubId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id);
    dispatch(fetchSubcategories(id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories & Subcategories</h1>

      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category Name"
            className="border px-3 py-1 rounded"
          />
          <button
            onClick={() => {
              if (editCategoryId) {
                dispatch(updateCategory({ id: editCategoryId, data: { name: newCategory } }));
                setEditCategoryId(null);
              } else {
                dispatch(createCategory({ name: newCategory }));
              }
              setNewCategory("");
            }}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            {editCategoryId ? "Update" : "Add"}
          </button>
        </div>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span
                onClick={() => handleSelectCategory(cat._id)}
                className={`cursor-pointer ${selectedCategoryId === cat._id ? "font-bold underline" : ""}`}
              >
                {cat.name}
              </span>
              <div className="space-x-2">
                <button onClick={() => { setEditCategoryId(cat._id); setNewCategory(cat.name); }} className="text-blue-500">Edit</button>
                <button onClick={() => dispatch(deleteCategory(cat._id))} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Subcategories */}
      {selectedCategoryId && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Subcategories of Selected</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
              placeholder="New Subcategory Name"
              className="border px-3 py-1 rounded"
            />
            <button
              onClick={() => {
                if (editSubId) {
                  dispatch(updateSubcategory({
                    categoryId: selectedCategoryId,
                    subId: editSubId,
                    data: { name: newSubcategory },
                  }));
                  setEditSubId(null);
                } else {
                  dispatch(createSubcategory({
                    categoryId: selectedCategoryId,
                    data: { name: newSubcategory },
                  }));
                }
                setNewSubcategory("");
              }}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              {editSubId ? "Update" : "Add"}
            </button>
          </div>
          <ul className="space-y-1">
            {(subcategories[selectedCategoryId] || []).map((sub) => (
              <li key={sub._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>{sub.name}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditSubId(sub._id);
                      setNewSubcategory(sub.name);
                    }}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      dispatch(deleteSubcategory({ categoryId: selectedCategoryId, subId: sub._id }))
                    }
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}
    </div>
  );
}
