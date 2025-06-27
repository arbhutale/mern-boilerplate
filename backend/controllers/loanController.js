import LoanAccount from "../models/LoanAccount.js";

/**
 * Helper: Calculate remaining EMI, principal, interest, and balance
 */
const calculateLoanStats = (loan) => {
  const { loanAmount, interestRate, tenureMonths, startDate, emiPaid } = loan;
  const monthlyRate = interestRate / 12 / 100;

  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;
  const remainingEMI = tenureMonths - emiPaid;
  const remainingAmount = emi * remainingEMI;

  return {
    emi: parseFloat(emi.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    remainingEMI,
    remainingAmount: parseFloat(remainingAmount.toFixed(2)),
  };
};

// ➕ Create loan
export const createLoanAccount = async (req, res) => {
  try {
    const loan = new LoanAccount(req.body);
    const stats = calculateLoanStats(loan);
    Object.assign(loan, stats);

    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📥 Get all loans
export const getAllLoanAccounts = async (req, res) => {
  try {
    const loans = await LoanAccount.find().populate("user");
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Get single loan
export const getLoanAccountById = async (req, res) => {
  try {
    const loan = await LoanAccount.findById(req.params.id).populate("user");
    if (!loan) return res.status(404).json({ error: "Loan not found" });

    const stats = calculateLoanStats(loan);
    res.status(200).json({ ...loan.toObject(), ...stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔄 Update loan
export const updateLoanAccount = async (req, res) => {
  try {
    const updated = await LoanAccount.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "Loan not found" });

    const stats = calculateLoanStats(updated);
    Object.assign(updated, stats);

    await updated.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ Delete loan
export const deleteLoanAccount = async (req, res) => {
  try {
    const deleted = await LoanAccount.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Loan not found" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
