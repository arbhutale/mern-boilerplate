import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}api/payment-methods`;

const getAuthHeader = (getState) => {
  const token = getState().auth.token;
  return { headers: { Authorization: `Bearer ${token}` } };
};

// 📦 Fetch all payment methods
export const fetchPaymentMethods = createAsyncThunk(
  "paymentMethods/fetchAll",
  async (_, { getState }) => {
    const res = await axios.get(BASE_URL, getAuthHeader(getState));
    return res.data;
  }
);

// ➕ Create payment method
export const createPaymentMethod = createAsyncThunk(
  "paymentMethods/create",
  async (data, { getState }) => {
    const res = await axios.post(BASE_URL, data, getAuthHeader(getState));
    return res.data;
  }
);

// 📝 Update payment method
export const updatePaymentMethod = createAsyncThunk(
  "paymentMethods/update",
  async ({ id, data }, { getState }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data, getAuthHeader(getState));
    return res.data;
  }
);

// ❌ Delete payment method
export const deletePaymentMethod = createAsyncThunk(
  "paymentMethods/delete",
  async (id, { getState }) => {
    await axios.delete(`${BASE_URL}/${id}`, getAuthHeader(getState));
    return id;
  }
);

const paymentMethodSlice = createSlice({
  name: "paymentMethods",
  initialState: {
    paymentMethods: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createPaymentMethod.fulfilled, (state, action) => {
        state.paymentMethods.push(action.payload);
      })

      // UPDATE
      .addCase(updatePaymentMethod.fulfilled, (state, action) => {
        const index = state.paymentMethods.findIndex((pm) => pm._id === action.payload._id);
        if (index !== -1) state.paymentMethods[index] = action.payload;
      })

      // DELETE
      .addCase(deletePaymentMethod.fulfilled, (state, action) => {
        state.paymentMethods = state.paymentMethods.filter((pm) => pm._id !== action.payload);
      });
  },
});

export default paymentMethodSlice.reducer;
