import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bankReducer from './slices/bankSlice'
import creditCardReducer from "./slices/creditCardSlice";
import loanAccountReducer from "./slices/loanAccountSlice";
import paymentMethodReducer from "./slices/paymentMethodSlice";
import transactionReducer from "./slices/transactionSlice";
import categoriesReducer from "./slices/categorySlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    banks: bankReducer,
    creditCards: creditCardReducer,
    loanAccounts: loanAccountReducer,
    paymentMethods: paymentMethodReducer,
    transactions: transactionReducer,
    categories: categoriesReducer
  },
});

export default store;