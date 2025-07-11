// controllers/paymentMethodController.js
import PaymentMethod from "../models/PaymentMethod.js";

// Create a new payment method
export const createPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = new PaymentMethod({ ...req.body, user: req.user.id });
    await paymentMethod.save();
    res.status(201).json(paymentMethod);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to create payment method" });
  }
};

// Get all payment methods for user
export const getPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.find({ user: req.user.id }).populate("bankAccount");
    res.json(methods);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payment methods" });
  }
};

// Get a single payment method
export const getPaymentMethodById = async (req, res) => {
  try {
    const method = await PaymentMethod.findOne({ _id: req.params.id, user: req.user.id }).populate("bankAccount");
    if (!method) return res.status(404).json({ error: "Payment method not found" });
    res.json(method);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payment method" });
  }
};

// Update a payment method
export const updatePaymentMethod = async (req, res) => {
  try {
    const updated = await PaymentMethod.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Payment method not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update payment method" });
  }
};

// Delete a payment method
export const deletePaymentMethod = async (req, res) => {
  try {
    const deleted = await PaymentMethod.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Payment method not found" });
    res.json({ message: "Payment method deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete payment method" });
  }
};
