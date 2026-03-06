// controllers/productController.js
const path = require('path');
const productList = require("../data/product.json");

const getAllProducts =  (req, res) => {
    res.sendFile(path.join(__dirname, '../views/products.html'))
    res.status(200).json(productList);
};

const getProductById = (req, res) => {
    // const productListData = productList.find(p => p.id == req.params.id);
     res.sendFile(path.join(__dirname, "../views/productDetail.html"));
//   res.status(200).json(productListData)
}

// const createProduct = (req, res) => {
//   console.log("Create new product");
// };

// const updateProduct = (req, res) => {
//   console.log("Update product");
// };

// const deleteProduct = (req, res) => {
//   console.log("Delete product");
// };

module.exports = {
  getAllProducts,
  getProductById,
};
