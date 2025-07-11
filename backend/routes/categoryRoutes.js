import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory
} from "../controllers/categoryController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management
 *   - name: Subcategories
 *     description: Subcategory management
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", authenticateToken, getCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
router.post("/", authenticateToken, createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category data
 */
router.get("/:id", authenticateToken, getCategoryById);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security: [{ bearerAuth: [] }]
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated category
 */
router.put("/:id", authenticateToken, updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 */
router.delete("/:id", authenticateToken, deleteCategory);


// ---- SUBCATEGORY ROUTES ----


/**
 * @swagger
 * /api/categories/{categoryId}/subcategories:
 *   post:
 *     summary: Create subcategory under a category
 *     tags: [Subcategories]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - name: categoryId
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
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subcategory created
 */
router.post("/:categoryId/subcategories", authenticateToken, createSubCategory);

/**
 * @swagger
 * /api/categories/{categoryId}/subcategories:
 *   get:
 *     summary: Get all subcategories of a category
 *     tags: [Subcategories]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of subcategories
 */
router.get("/:categoryId/subcategories", authenticateToken, getAllSubCategories);

/**
 * @swagger
 * /api/categories/{categoryId}/subcategories/{subId}:
 *   get:
 *     summary: Get subcategory by ID
 *     tags: [Subcategories]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: subId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subcategory data
 */
router.get("/:categoryId/subcategories/:subId", authenticateToken, getSubCategoryById);

/**
 * @swagger
 * /api/categories/{categoryId}/subcategories/{subId}:
 *   put:
 *     summary: Update a subcategory
 *     tags: [Subcategories]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: subId
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated subcategory
 */
router.put("/:categoryId/subcategories/:subId", authenticateToken, updateSubCategory);

/**
 * @swagger
 * /api/categories/{categoryId}/subcategories/{subId}:
 *   delete:
 *     summary: Delete a subcategory
 *     tags: [Subcategories]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: subId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subcategory deleted
 */
router.delete("/:categoryId/subcategories/:subId", authenticateToken, deleteSubCategory);

export default router;
