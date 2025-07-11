// models/PaymentMethod.js
import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bankAccount: { type: mongoose.Schema.Types.ObjectId, ref: "BankAccount", required: true },
  methodType: {
    type: String,
    enum: ["DEBIT_CARD", "UPI", "NET_BANKING", "CASH", "CHEQUE", "OTHER"],
    required: true,
  },
  details: {
    number: String,     // For debit card
    expiry: String,          // For UPI
    secure: String,   // Optional for net banking
    desc: String
  },
});

export default mongoose.model("PaymentMethod", paymentMethodSchema);
