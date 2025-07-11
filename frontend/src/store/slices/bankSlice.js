// src/store/slices/bankSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}bank-accounts`;

const getAuthHeader = (getState) => {
  const token = getState().auth.token;
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Thunks
export const fetchBanks = createAsyncThunk("banks/fetchAll", async (_, { getState }) => {
  const res = await axios.get(BASE_URL, getAuthHeader(getState));
  return res.data;
});

export const createBank = createAsyncThunk("banks/create", async (data, { getState }) => {
  const res = await axios.post(BASE_URL, data, getAuthHeader(getState));
  return res.data;
});

export const updateBank = createAsyncThunk("banks/update", async ({ id, data }, { getState }) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data, getAuthHeader(getState));
  return res.data;
});

export const deleteBank = createAsyncThunk("banks/delete", async (id, { getState }) => {
  await axios.delete(`${BASE_URL}/${id}`, getAuthHeader(getState));
  return id;
});

const bankSlice = createSlice({
  name: "banks",
  initialState: {
    banks: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanks.pending, (state) => { state.loading = true; })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.banks = action.payload;
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBank.fulfilled, (state, action) => {
        state.banks.push(action.payload);
      })
      .addCase(updateBank.fulfilled, (state, action) => {
        const index = state.banks.findIndex(b => b._id === action.payload._id);
        if (index !== -1) state.banks[index] = action.payload;
      })
      .addCase(deleteBank.fulfilled, (state, action) => {
        state.banks = state.banks.filter(b => b._id !== action.payload);
      });
  },
});

export default bankSlice.reducer;
