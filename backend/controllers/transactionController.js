import Transaction from "../models/Transaction.js";
import { applyTransactionBalanceChange } from "../utils/updateBalances.js"

export const createTransaction = async (req, res) => {
  try {
    const tx = new Transaction({ ...req.body, user: req.user.id });
    await tx.save();
    await applyTransactionBalanceChange(tx);
    res.status(201).json(tx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .populate("category")
      .populate("subcategory")
      .populate("paymentMethod")
      .populate({ path: "sourceId", model: (doc) => doc.sourceTypeRef });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    })
      .populate("category")
      .populate("subcategory")
      .populate("paymentMethod")
      .populate({ path: "sourceId", model: (doc) => doc.sourceTypeRef });

    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
};

export const updateTransaction = async (req, res) => {
  const oldTx = await Transaction.findById(req.params.id);
  if (!oldTx || oldTx.user.toString() !== req.user.id)
    return res.status(404).json({ error: "Transaction not found" });

  await applyTransactionBalanceChange(oldTx, true); // reverse old tx

  const updatedTx = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  await applyTransactionBalanceChange(updatedTx); // apply new tx

  res.json(updatedTx);
};

export const deleteTransaction = async (req, res) => {
  const tx = await Transaction.findById(req.params.id);
  if (!tx || tx.user.toString() !== req.user.id)
    return res.status(404).json({ error: "Transaction not found" });

  await applyTransactionBalanceChange(tx, true); // reverse tx
  await tx.remove();

  res.json({ message: "Deleted" });
};
