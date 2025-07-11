// store/slices/api/transactionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}api/transactions`;

const getAuthHeader = (getState) => {
  const token = getState().auth.token;
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Thunks
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (params = {}, { getState }) => {
    const res = await axios.get(BASE_URL, {
      ...getAuthHeader(getState),
      params, // Accept filters and pagination
    });
    return res.data;
  }
);

export const createTransaction = createAsyncThunk("transactions/create",  async (data, { getState }) => {
    const res = await axios.post(BASE_URL, data, getAuthHeader(getState));
    return res.data;
});

export const updateTransaction = createAsyncThunk("transactions/update", async ({ id, data }, { getState }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data, getAuthHeader(getState));
    return res.data;
});

export const deleteTransaction = createAsyncThunk("transactions/delete",  async (id, { getState }) => {
    await axios.delete(`${BASE_URL}/${id}`, getAuthHeader(getState));
    return id;
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
  transactions: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
},

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.transactions[index] = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((t) => t._id !== action.payload);
      });
  },
});

export default transactionSlice.reducer;
