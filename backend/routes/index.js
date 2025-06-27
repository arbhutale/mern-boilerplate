// routes/index.js
import express from "express";

// Import all modular route files
import authRoutes from "./authRoutes.js";
import bankAccountRoutes from "./bankAccountRoutes.js";
import creditCardRoutes from "./creditCardRoutes.js";
import loanAccountRoutes from "./loanAccountRoute.js";
import categoryRoutes from "./categoryRoutes.js";
import transactionRoutes from "./transactionRoute.js";
import paymentMethodRoutes from "./paymentMethodRoutes.js";

const router = express.Router();

// Prefix and mount each route
router.use("/auth", authRoutes);
router.use("/bank-accounts", bankAccountRoutes);
router.use("/credit-cards", creditCardRoutes);
router.use("/loan-accounts", loanAccountRoutes);
router.use("/categories", categoryRoutes);
router.use("/transactions", transactionRoutes);
router.use("/payment-methods", paymentMethodRoutes);

export default router;
