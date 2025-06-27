import express from "express";
import {
  createLoanAccount,
  getAllLoanAccounts,
  getLoanAccountById,
  updateLoanAccount,
  deleteLoanAccount,
} from "../controllers/loanController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: LoanAccounts
 *   description: API for managing loan accounts
 */

/**
 * @swagger
 * /api/loan-accounts:
 *   post:
 *     summary: Create a new loan account
 *     tags: [LoanAccounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoanAccount'
 *     responses:
 *       201:
 *         description: Loan account created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", createLoanAccount);

/**
 * @swagger
 * /api/loan-accounts:
 *   get:
 *     summary: Get all loan accounts
 *     tags: [LoanAccounts]
 *     responses:
 *       200:
 *         description: List of loan accounts
 */
router.get("/", getAllLoanAccounts);

/**
 * @swagger
 * /api/loan-accounts/{id}:
 *   get:
 *     summary: Get a loan account by ID
 *     tags: [LoanAccounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Loan account ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loan account found
 *       404:
 *         description: Loan account not found
 */
router.get("/:id", getLoanAccountById);

/**
 * @swagger
 * /api/loan-accounts/{id}:
 *   put:
 *     summary: Update a loan account by ID
 *     tags: [LoanAccounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Loan account ID
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoanAccount'
 *     responses:
 *       200:
 *         description: Loan account updated
 *       404:
 *         description: Loan account not found
 */
router.put("/:id", updateLoanAccount);

/**
 * @swagger
 * /api/loan-accounts/{id}:
 *   delete:
 *     summary: Delete a loan account by ID
 *     tags: [LoanAccounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Loan account ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loan account deleted
 *       404:
 *         description: Loan account not found
 */
router.delete("/:id", deleteLoanAccount);

export default router;
