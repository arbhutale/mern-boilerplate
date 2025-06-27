// routes/transactionRoutes.js
import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Manage user transactions
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get("/", authenticateToken, getTransactions);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a single transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction data
 *       404:
 *         description: Not found
 */
router.get("/:id", authenticateToken, getTransactionById);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - sourceType
 *               - sourceId
 *               - sourceTypeRef
 *             properties:
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               sourceType:
 *                 type: string
 *                 enum: [BANK_ACCOUNT, CREDIT_CARD, LOAN_ACCOUNT]
 *               sourceId:
 *                 type: string
 *               sourceTypeRef:
 *                 type: string
 *                 enum: [BankAccount, CreditCard, LoanAccount]
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created transaction
 */
router.post("/", authenticateToken, createTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated transaction
 */
router.put("/:id", authenticateToken, updateTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete("/:id", authenticateToken, deleteTransaction);

export default router;
