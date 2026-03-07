const express = require("express");
const route = express.Router();
const {
    createCategory,
    getAllCategories,
    getCategoryBySlug,
    updateCategory,
    deleteCategory,
} = require('../controllers/category');

route.get("/", getAllCategories);
route.get("/:slug", getCategoryBySlug);
route.post("/", createCategory);
route.put("/:slug", updateCategory);
route.delete("/:slug", deleteCategory);

module.exports = route;
