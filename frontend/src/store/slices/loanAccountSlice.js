// store/slices/loanAccountSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLoanAccounts = createAsyncThunk("loan/fetchAll", async () => {
  const res = await axios.get("/loan-accounts");
  return res.data;
});

export const createLoanAccount = createAsyncThunk("loan/create", async (data) => {
  const res = await axios.post("/loan-accounts", data);
  return res.data;
});
export const updateLoanAccount = createAsyncThunk("loan/update", async ({ id, data }) => {
  const res = await axios.put(`/loan-accounts/${id}`, data);
  return res.data;
});

export const deleteLoanAccount = createAsyncThunk("loan/delete", async (id) => {
  await axios.delete(`/loan-accounts/${id}`);
  return id;
});

const loanAccountSlice = createSlice({
  name: "loanAccounts",
  initialState: {
    loanAccounts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoanAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.loanAccounts = action.payload;
      })
      .addCase(fetchLoanAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createLoanAccount.fulfilled, (state, action) => {
        state.loanAccounts.push(action.payload);
      })
    .addCase(updateLoanAccount.fulfilled, (state, action) => {
      const index = state.loanAccounts.findIndex((l) => l._id === action.payload._id);
      if (index !== -1) state.loanAccounts[index] = action.payload;
    })
    .addCase(deleteLoanAccount.fulfilled, (state, action) => {
      state.loanAccounts = state.loanAccounts.filter((l) => l._id !== action.payload);
    });
      
  },
});

export default loanAccountSlice.reducer;
