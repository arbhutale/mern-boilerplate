import express from "express";
import {
  createCreditCard,
  getCreditCards,
  getCreditCardById,
  updateCreditCard,
  deleteCreditCard,
} from "../controllers/creditCardController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CreditCards
 *   description: Manage credit cards
 */

/**
 * @swagger
 * /credit-cards:
 *   post:
 *     summary: Create a credit card
 *     tags: [CreditCards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [cardName, cardNumber]
 *             properties:
 *               cardName:
 *                 type: string
 *                 example: HDFC Regalia
 *               cardNumber:
 *                 type: string
 *                 example: 1234-5678-9012-3456
 *               description:
 *                 type: string
 *                 example: Travel card
 *               limit:
 *                 type: number
 *                 example: 200000
 *     responses:
 *       201:
 *         description: Credit card created
 */
router.post("/", authenticateToken, createCreditCard);

/**
 * @swagger
 * /credit-cards:
 *   get:
 *     summary: Get all credit cards
 *     tags: [CreditCards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of credit cards
 */
router.get("/", authenticateToken, getCreditCards);

/**
 * @swagger
 * /credit-cards/{id}:
 *   get:
 *     summary: Get a credit card by ID
 *     tags: [CreditCards]
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
 *         description: Credit card data
 *       404:
 *         description: Not found
 */
router.get("/:id", authenticateToken, getCreditCardById);

/**
 * @swagger
 * /credit-cards/{id}:
 *   put:
 *     summary: Update a credit card
 *     tags: [CreditCards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardName:
 *                 type: string
 *               description:
 *                 type: string
 *               limit:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/:id", authenticateToken, updateCreditCard);

/**
 * @swagger
 * /credit-cards/{id}:
 *   delete:
 *     summary: Delete a credit card
 *     tags: [CreditCards]
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
 *         description: Deleted successfully
 */
router.delete("/:id", authenticateToken, deleteCreditCard);

export default router;
