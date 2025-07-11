import mongoose from 'mongoose';

const creditCardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  name: { type: String, required: true },         // e.g., "HDFC Regalia"
  number: { type: String, required: true },       // Masked or full
  description: { type: String },                      // Optional details or notes
  expiry: { type: String },
  cvv: { type: Number },
  balance: { type: Number, default: 0 },              // Outstanding amount
  limit: { type: Number, default: 100000 },           // Credit limit
}, {
  timestamps: true
});

export default mongoose.model('CreditCard', creditCardSchema);
