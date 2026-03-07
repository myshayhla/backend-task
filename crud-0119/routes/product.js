const express = require("express");
const { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById } = require("../controllers/product");
const route = express.Router();

route.get("/", getAllProducts);
route.get("/:id", getProductById);
route.post("/", createProduct);
route.put("/:id", updateProductById);
route.delete("/:id", deleteProductById);

module.exports = route;
