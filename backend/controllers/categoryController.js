import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";

// ---- CATEGORY CRUD ----
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create({ ...req.body, user: req.user.id });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllCategories = async (req, res) => {
  const categories = await Category.find({ user: req.user.id });
  res.json(categories);
};

export const getCategoryById = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id, user: req.user.id });
  if (!category) return res.status(404).json({ error: "Category not found" });
  res.json(category);
};

export const updateCategory = async (req, res) => {
  const category = await Category.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!category) return res.status(404).json({ error: "Category not found" });
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!category) return res.status(404).json({ error: "Category not found" });

  await SubCategory.deleteMany({ category: category._id });
  res.json({ message: "Category and its subcategories deleted" });
};

// ---- SUBCATEGORY CRUD ----
export const createSubCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const sub = await SubCategory.create({
      name: req.body.name,
      user: req.user.id,
      category: categoryId,
    });
    res.status(201).json(sub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllSubCategories = async (req, res) => {
  const { categoryId } = req.params;
  const subs = await SubCategory.find({ category: categoryId, user: req.user.id });
  res.json(subs);
};

export const getSubCategoryById = async (req, res) => {
  const sub = await SubCategory.findOne({
    _id: req.params.subId,
    category: req.params.categoryId,
    user: req.user.id,
  });
  if (!sub) return res.status(404).json({ error: "Subcategory not found" });
  res.json(sub);
};

export const updateSubCategory = async (req, res) => {
  const sub = await SubCategory.findOneAndUpdate(
    { _id: req.params.subId, category: req.params.categoryId, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!sub) return res.status(404).json({ error: "Subcategory not found" });
  res.json(sub);
};

export const deleteSubCategory = async (req, res) => {
  const sub = await SubCategory.findOneAndDelete({
    _id: req.params.subId,
    category: req.params.categoryId,
    user: req.user.id,
  });
  if (!sub) return res.status(404).json({ error: "Subcategory not found" });
  res.json({ message: "Subcategory deleted" });
};
