// routes/bankAccountRoutes.js
import express from "express";
import BankAccount from "../models/BankAccount.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: BankAccounts
 *   description: API for managing bank accounts
 */

/**
 * @swagger
 * /api/bank-accounts:
 *   get:
 *     summary: Get all bank accounts for the authenticated user
 *     tags: [BankAccounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bank accounts
 */
router.get("/", authenticateToken, async (req, res) => {
  const accounts = await BankAccount.find({ user: req.user.id });
  res.json(accounts);
});

/**
 * @swagger
 * /api/bank-accounts:
 *   post:
 *     summary: Create a new bank account
 *     tags: [BankAccounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               bankName:
 *                 type: string
 *               balance:
 *                 type: number
 *     responses:
 *       201:
 *         description: Account created
 */
router.post("/", authenticateToken, async (req, res) => {
  const newAccount = new BankAccount({ ...req.body, user: req.user.id });
  const saved = await newAccount.save();
  res.status(201).json(saved);
});

/**
 * @swagger
 * /api/bank-accounts/{id}:
 *   put:
 *     summary: Update a bank account
 *     tags: [BankAccounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Account updated
 */
router.put("/:id", authenticateToken, async (req, res) => {
  const updated = await BankAccount.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

/**
 * @swagger
 * /api/bank-accounts/{id}:
 *   delete:
 *     summary: Delete a bank account
 *     tags: [BankAccounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Account deleted
 */
router.delete("/:id", authenticateToken, async (req, res) => {
  await BankAccount.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
