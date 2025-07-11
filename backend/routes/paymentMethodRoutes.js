// routes/paymentMethodRoutes.js
import express from "express";
import {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
} from "../controllers/paymentMethodController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PaymentMethods
 *   description: Manage user's payment methods (UPI, debit card, net banking)
 */

/**
 * @swagger
 * /api/payment-methods:
 *   get:
 *     summary: Get all payment methods for the user
 *     tags: [PaymentMethods]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payment methods
 */
router.get("/", authenticateToken, getPaymentMethods);

/**
 * @swagger
 * /api/payment-methods/{id}:
 *   get:
 *     summary: Get a single payment method by ID
 *     tags: [PaymentMethods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment method ID
 *     responses:
 *       200:
 *         description: The payment method object
 *       404:
 *         description: Payment method not found
 */
router.get("/:id", authenticateToken, getPaymentMethodById);

/**
 * @swagger
 * /api/payment-methods:
 *   post:
 *     summary: Create a new payment method
 *     tags: [PaymentMethods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bankAccount
 *               - methodType
 *             properties:
 *               bankAccount:
 *                 type: string
 *               methodType:
 *                 type: string
 *                 enum: [DEBIT_CARD, UPI, NET_BANKING]
 *               details:
 *                 type: object
 *                 properties:
 *                   number:
 *                     type: string
 *                   expiry:
 *                     type: string
 *                   secure:
 *                     type: string
 *                   desc:
 *                     type: string
 *     responses:
 *       201:
 *         description: Payment method created
 */
router.post("/", authenticateToken, createPaymentMethod);

/**
 * @swagger
 * /api/payment-methods/{id}:
 *   put:
 *     summary: Update a payment method
 *     tags: [PaymentMethods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment method ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               methodType:
 *                 type: string
 *               details:
 *                 type: object
 *                 properties:
 *                   number:
 *                     type: string
 *                   expiry:
 *                     type: string
 *                   secure:
 *                     type: string
*                   desc:
 *                     type: string
 *     responses:
 *       200:
 *         description: Updated payment method
 */
router.put("/:id", authenticateToken, updatePaymentMethod);

/**
 * @swagger
 * /api/payment-methods/{id}:
 *   delete:
 *     summary: Delete a payment method
 *     tags: [PaymentMethods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment method deleted
 */
router.delete("/:id", authenticateToken, deletePaymentMethod);

export default router;
