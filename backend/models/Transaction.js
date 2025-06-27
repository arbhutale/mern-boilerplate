// models/Transaction.js
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  amount: { type: Number, required: true },
   transactionType: {
    type: String,
    enum: ["CREDIT", "DEBIT"],
    required: true,
  },
  date: { type: Date, default: Date.now },
  description: { type: String },

  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },

  // Payment source polymorphic reference
  sourceType: {
    type: String,
    enum: ["BANK_ACCOUNT", "CREDIT_CARD", "LOAN_ACCOUNT"],
    required: true,
  },
  sourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "sourceTypeRef",
  },
  // Dynamic reference path
  sourceTypeRef: {
    type: String,
    required: true,
    enum: ["BankAccount", "CreditCard", "LoanAccount"],
  },

  // Optional: if sourceType === 'BANK_ACCOUNT'
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentMethod",
  },
});

export default mongoose.model("Transaction", transactionSchema);
