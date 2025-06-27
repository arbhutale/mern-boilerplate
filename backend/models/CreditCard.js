import mongoose from 'mongoose';

const creditCardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  cardName: { type: String, required: true },         // e.g., "HDFC Regalia"
  cardNumber: { type: String, required: true },       // Masked or full
  description: { type: String },                      // Optional details or notes

  balance: { type: Number, default: 0 },              // Outstanding amount
  limit: { type: Number, default: 100000 },           // Credit limit
}, {
  timestamps: true
});

export default mongoose.model('CreditCard', creditCardSchema);
