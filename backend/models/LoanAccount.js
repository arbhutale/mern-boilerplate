import mongoose from 'mongoose';

const emiSchema = new mongoose.Schema({
  dueDate: Date,
  amount: Number,
  isPaid: { type: Boolean, default: false },
  paidTransaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
});

const loanAccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bankAccount: String,
  principal: Number,
  roi: Number, // rate of interest
  termMonths: Number,
  startDate: Date,
  emiSchedule: [emiSchema],
});

export default mongoose.model('LoanAccount', loanAccountSchema);