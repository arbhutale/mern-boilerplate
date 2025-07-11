// store/slices/creditCardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Mock API base URL (adjust as needed)
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}api/credit-cards`;

const getAuthHeader = (getState) => {
  const token = getState().auth.token;
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Async thunks
export const fetchCreditCards = createAsyncThunk("creditCards/fetchAll", async (_, { getState })  => {
  console.log("testdsdsdsdsddsdsd")
  const res = await axios.get(BASE_URL,  getAuthHeader(getState));
  return res.data;
});

export const createCreditCard = createAsyncThunk("creditCards/create", async (data, { getState }) => {
  const res = await axios.post(BASE_URL, data,  getAuthHeader(getState));
  return res.data;
});

export const updateCreditCard = createAsyncThunk("creditCards/update", async ({ id, data }, { getState }) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data,  getAuthHeader(getState));
  return res.data;
});

export const deleteCreditCard = createAsyncThunk("creditCards/delete", async (id, { getState }) => {
  await axios.delete(`${BASE_URL}/${id}` ,  getAuthHeader(getState));
  return id;
});

// Slice
const creditCardSlice = createSlice({
  name: "creditCards",
  initialState: {
    creditCards: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCreditCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreditCards.fulfilled, (state, action) => {
        state.loading = false;
        state.creditCards = action.payload;
      })
      .addCase(fetchCreditCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create
      .addCase(createCreditCard.fulfilled, (state, action) => {
        state.creditCards.push(action.payload);
      })

      // Update
      .addCase(updateCreditCard.fulfilled, (state, action) => {
        const index = state.creditCards.findIndex((card) => card._id === action.payload._id);
        if (index !== -1) {
          state.creditCards[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteCreditCard.fulfilled, (state, action) => {
        state.creditCards = state.creditCards.filter((card) => card._id !== action.payload);
      });
  },
});

export default creditCardSlice.reducer;
