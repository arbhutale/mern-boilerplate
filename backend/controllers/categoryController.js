import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Category.findOne({ user: req.user.id, name });
    if (existing) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = new Category({ user: req.user.id, name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, user: req.user.id });
    if (!category) return res.status(404).json({ error: "Not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name: req.body.name },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Category not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
};

export const createSubCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const subCategory = new SubCategory({
      name,
      category: categoryId,
      user: req.user.id,
    });

    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ error: "Failed to create subcategory" });
  }
};

export const getAllSubCategories = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subCategories = await SubCategory.find({
      category: categoryId,
      user: req.user.id,
    });

    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
};

export const getSubCategoryById = async (req, res) => {
  try {
    const { categoryId, subId } = req.params;

    const subCategory = await SubCategory.findOne({
      _id: subId,
      category: categoryId,
      user: req.user.id,
    });

    if (!subCategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.json(subCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategory" });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const { categoryId, subId } = req.params;
    const { name } = req.body;

    const subCategory = await SubCategory.findOneAndUpdate(
      {
        _id: subId,
        category: categoryId,
        user: req.user.id,
      },
      { name },
      { new: true }
    );

    if (!subCategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.json(subCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subcategory" });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const { categoryId, subId } = req.params;

    const subCategory = await SubCategory.findOneAndDelete({
      _id: subId,
      category: categoryId,
      user: req.user.id,
    });

    if (!subCategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.json({ message: "Subcategory deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subcategory" });
  }
};
