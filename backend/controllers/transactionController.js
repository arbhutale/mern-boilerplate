import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import "../models/BankAccount.js";
import "../models/CreditCard.js";
import "../models/LoanAccount.js";
import { applyTransactionBalanceChange } from "../utils/updateBalances.js";

// ➕ Create Transaction
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

// 📥 Get All Transactions (with filtering, sorting, pagination)
export const getTransactions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "date",
      sortOrder = "desc",
      startDate,
      endDate,
      category,
      transactionType,
    } = req.query;

    const query = { user: req.user.id };

    // 🗓️ Filter by date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // 📂 Filter by category
    if (category) {
      query.category = category;
    }

    // 💰 Filter by transactionType
    if (transactionType) {
      query.transactionType = transactionType.toUpperCase(); // CREDIT / DEBIT
    }

    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const transactions = await Transaction.find(query)
      .populate("category")
      .populate("subcategory")
      .populate("paymentMethod")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    // 🔁 Manual population for polymorphic sourceId
    const populated = await Promise.all(
      transactions.map(async (tx) => {
        try {
          const Model = mongoose.model(tx.sourceTypeRef);
          const source = await Model.findById(tx.sourceId).lean();
          return { ...tx, source };
        } catch {
          return tx;
        }
      })
    );

    // Get total count for frontend pagination
    const total = await Transaction.countDocuments(query);

    res.json({
      data: populated,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};


// 🔍 Get Single Transaction
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    })
      .populate("category")
      .populate("subcategory")
      .populate("paymentMethod")
      .lean();

    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    try {
      const Model = mongoose.model(transaction.sourceTypeRef);
      const source = await Model.findById(transaction.sourceId).lean();
      res.json({ ...transaction, source });
    } catch {
      res.json(transaction); // Return without source if failed
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
};

// 🔄 Update Transaction
export const updateTransaction = async (req, res) => {
  try {
    const oldTx = await Transaction.findById(req.params.id);
    if (!oldTx || oldTx.user.toString() !== req.user.id) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await applyTransactionBalanceChange(oldTx, true); // Reverse old tx

    const updatedTx = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    await applyTransactionBalanceChange(updatedTx); // Apply new tx

    res.json(updatedTx);
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

// ❌ Delete Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx || tx.user.toString() !== req.user.id) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await applyTransactionBalanceChange(tx, true); // Reverse balance
    await tx.deleteOne();

    res.json({ message: "Deleted" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
