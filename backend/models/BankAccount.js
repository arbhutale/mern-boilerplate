import mongoose from 'mongoose';

const bankAccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  type: { type: String, enum: ['Savings', 'Current', 'Cash'], default: 'Savings' },
  ifsc: { type: String},
  branch: { type: String},
  accountNumber: { type: String},
  description: { type: String},
  balance: { type: Number, default: 0 },
});

export default mongoose.model('BankAccount', bankAccountSchema);