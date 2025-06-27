import CreditCard from "../models/CreditCard.js";

// Create
export const createCreditCard = async (req, res) => {
  try {
    const creditCard = new CreditCard({ ...req.body, user: req.user.id });
    await creditCard.save();
    res.status(201).json(creditCard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All
export const getCreditCards = async (req, res) => {
  const cards = await CreditCard.find({ user: req.user.id });
  res.json(cards);
};

// Get One
export const getCreditCardById = async (req, res) => {
  const card = await CreditCard.findOne({ _id: req.params.id, user: req.user.id });
  if (!card) return res.status(404).json({ error: "Credit card not found" });
  res.json(card);
};

// Update
export const updateCreditCard = async (req, res) => {
  const card = await CreditCard.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!card) return res.status(404).json({ error: "Credit card not found" });
  res.json(card);
};

// Delete
export const deleteCreditCard = async (req, res) => {
  const card = await CreditCard.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!card) return res.status(404).json({ error: "Credit card not found" });
  res.json({ message: "Deleted" });
};
