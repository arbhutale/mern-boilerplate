// store/slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}categories`;

const getAuthHeader = (getState) => {
  const token = getState().auth.token;
  return { headers: { Authorization: `Bearer ${token}` } };
};

// CATEGORY THUNKS
export const fetchCategories = createAsyncThunk("categories/fetch", async (_, { getState }) => {
  const res = await axios.get(BASE_URL, getAuthHeader(getState));
  return res.data;
});

export const createCategory = createAsyncThunk("categories/create", async (data, { getState }) => {
  const res = await axios.post(BASE_URL, data, getAuthHeader(getState));
  return res.data;
});

export const updateCategory = createAsyncThunk("categories/update", async ({ id, data }, { getState }) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data, getAuthHeader(getState));
  return res.data;
});

export const deleteCategory = createAsyncThunk("categories/delete", async (id, { getState }) => {
  await axios.delete(`${BASE_URL}/${id}`, getAuthHeader(getState));
  return id;
});

// SUBCATEGORY THUNKS
export const fetchSubcategories = createAsyncThunk("subcategories/fetch", async (categoryId, { getState }) => {
  const res = await axios.get(`${BASE_URL}/${categoryId}/subcategories`, getAuthHeader(getState));
  return { categoryId, subcategories: res.data };
});

export const createSubcategory = createAsyncThunk("subcategories/create", async ({ categoryId, data }, { getState }) => {
  const res = await axios.post(`${BASE_URL}/${categoryId}/subcategories`, data, getAuthHeader(getState));
  return { categoryId, subcategory: res.data };
});

export const updateSubcategory = createAsyncThunk("subcategories/update", async ({ categoryId, subId, data }, { getState }) => {
  const res = await axios.put(`${BASE_URL}/${categoryId}/subcategories/${subId}`, data, getAuthHeader(getState));
  return { categoryId, subcategory: res.data };
});

export const deleteSubcategory = createAsyncThunk("subcategories/delete", async ({ categoryId, subId }, { getState }) => {
  await axios.delete(`${BASE_URL}/${categoryId}/subcategories/${subId}`, getAuthHeader(getState));
  return { categoryId, subId };
});

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    subcategories: {}, // categoryId: [sub1, sub2]
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Categories
      .addCase(fetchCategories.pending, (state) => { state.loading = true; })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((cat) => cat._id === action.payload._id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
        delete state.subcategories[action.payload];
      })

      // Subcategories
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subcategories[action.payload.categoryId] = action.payload.subcategories;
      })
      .addCase(createSubcategory.fulfilled, (state, action) => {
        const { categoryId, subcategory } = action.payload;
        if (!state.subcategories[categoryId]) state.subcategories[categoryId] = [];
        state.subcategories[categoryId].push(subcategory);
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        const { categoryId, subcategory } = action.payload;
        const subList = state.subcategories[categoryId] || [];
        const index = subList.findIndex((s) => s._id === subcategory._id);
        if (index !== -1) subList[index] = subcategory;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        const { categoryId, subId } = action.payload;
        const subList = state.subcategories[categoryId];
        if (subList) {
          state.subcategories[categoryId] = subList.filter((s) => s._id !== subId);
        }
      });
  },
});

export default categorySlice.reducer;
