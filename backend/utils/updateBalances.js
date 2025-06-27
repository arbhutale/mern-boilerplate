import BankAccount from "../models/BankAccount.js";
import CreditCard from "../models/CreditCard.js";
import LoanAccount from "../models/LoanAccount.js";

export async function applyTransactionBalanceChange(transaction, reverse = false) {
  const { amount, transactionType, sourceTypeRef, sourceId } = transaction;
  const actualAmount = reverse ? -amount : amount;

  if (sourceTypeRef === "BankAccount") {
    const bank = await BankAccount.findById(sourceId);
    if (!bank) return;

    bank.balance += transactionType === "CREDIT" ? actualAmount : -actualAmount;
    await bank.save();
  }

  if (sourceTypeRef === "CreditCard") {
    const card = await CreditCard.findById(sourceId);
    if (!card) return;

    // CREDIT = bill payment = reduce balance
    // DEBIT = card usage = increase balance
    card.balance += transactionType === "DEBIT" ? actualAmount : -actualAmount;
    await card.save();
  }

  if (sourceTypeRef === "LoanAccount") {
    const loan = await LoanAccount.findById(sourceId);
    if (!loan) return;

    // CREDIT = EMI paid = reduce principal
    // DEBIT = disbursement or interest increase = increase principal
    loan.remainingPrincipal += transactionType === "DEBIT" ? actualAmount : -actualAmount;
    await loan.save();
  }
}
