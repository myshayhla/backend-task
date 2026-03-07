const express = require("express");
const { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById } = require("../controllers/product");
const route = express.Router();

route.get("/", getAllProducts);
route.get("/", getProductById);
route.post("/", createProduct);
route.put("/", updateProductById);
route.delete("/", deleteProductById);

module.exports = route;
