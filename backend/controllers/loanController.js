import LoanAccount from "../models/LoanAccount.js";

/**
 * Helper: Calculate remaining EMI, principal, interest, and balance
 */
const calculateLoanStats = ({ principal, roi, termMonths, emiSchedule = [] }) => {
  const monthlyRate = roi / 12 / 100;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);

  const totalPayment = emi * termMonths;
  const totalInterest = totalPayment - principal;

  const paidEMICount = emiSchedule.filter(e => e.isPaid).length;
  const remainingEMI = termMonths - paidEMICount;
  const remainingAmount = emi * remainingEMI;

  return {
    emi: parseFloat(emi.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    remainingEMI,
    remainingAmount: parseFloat(remainingAmount.toFixed(2)),
  };
};

/**
 * Helper: Generate EMI schedule
 */
const generateEmiSchedule = (loan, emiAmount) => {
  const schedule = [];
  const start = new Date(loan.startDate);

  for (let i = 0; i < loan.termMonths; i++) {
    const dueDate = new Date(start);
    dueDate.setMonth(start.getMonth() + i);

    schedule.push({
      dueDate,
      amount: parseFloat(emiAmount.toFixed(2)),
      isPaid: false,
    });
  }

  return schedule;
};

// ➕ Create loan
export const createLoanAccount = async (req, res) => {
  try {
    const loan = new LoanAccount(req.body);

    // Calculate stats and generate EMI schedule
    const stats = calculateLoanStats(loan);
    loan.emiSchedule = generateEmiSchedule(loan, stats.emi);

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
    // Fetch the original loan
    const loan = await LoanAccount.findById(req.params.id);
    if (!loan) return res.status(404).json({ error: "Loan not found" });

    // Apply updates from request
    Object.assign(loan, req.body);

    // Recalculate EMI stats
    const stats = calculateLoanStats(loan);

    // Regenerate EMI schedule based on new startDate and termMonths
    loan.emiSchedule = generateEmiSchedule(loan, stats.emi);

    // Merge new stats
    Object.assign(loan, stats);

    // Save
    await loan.save();
    res.status(200).json(loan);
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
