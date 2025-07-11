import BankAccount from "../models/BankAccount.js";
import CreditCard from "../models/CreditCard.js";
import LoanAccount from "../models/LoanAccount.js";

export async function applyTransactionBalanceChange(transaction, reverse = false) {
  const { amount, transactionType, sourceType, sourceId } = transaction;
  const actualAmount = reverse ? -amount : amount;

  if (sourceType === "BANK_ACCOUNT") {
    const bank = await BankAccount.findById(sourceId);
    if (!bank) return;

    bank.balance += transactionType === "CREDIT" ? actualAmount : -actualAmount;
    await bank.save();
  }

  if (sourceType === "CREDIT_CARD") {
    const card = await CreditCard.findById(sourceId);
    if (!card) return;

    // CREDIT = bill payment = reduce balance
    // DEBIT = card usage = increase balance
    card.balance += transactionType === "DEBIT" ? actualAmount : -actualAmount;
    await card.save();
  }

  if (sourceType === "LOAN_ACCOUNT") {
    const loan = await LoanAccount.findById(sourceId);
    if (!loan) return;

    // CREDIT = EMI paid = reduce principal
    // DEBIT = disbursement or interest increase = increase principal
    loan.remainingPrincipal += transactionType === "DEBIT" ? actualAmount : -actualAmount;
    await loan.save();
  }
}
