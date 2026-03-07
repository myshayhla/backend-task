const products = require("../data/product");

const getAllProducts = (req, res) => {
    const filteredProducts = products;
    console.log(filteredProducts);
    
    const {
        name,
        category,
        price,
    search,
    sort,
    inStock,
    page = 1,
    limit = 5,
  } = req.query;

  //!name
  if (name) {
    const result = filteredProducts.filter(
      (p) => p.name.toLowerCase() === name.toLowerCase(),
    );
  }
  //!category
  if (category) {
    result = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
  }
  //!price
  if (price) {
    result = filteredProducts.price((p) => p.price === price);
  }
  //!search
  if (search) {
    const result = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
    res.status(200).json(result);
    }
  //!search
  if (sort) {
    result.sort((a, b) => {
      // number field (price, rating, id)
      if (typeof a[sort] === "number") {
        return a[sort] - b[sort];
      }

      // string field (name)
      if (typeof a[sort] === "string") {
        return a[sort].localeCompare(b[sort]);
      }

      return 0;
    });
  }
  //!instock
  if (!inStock !== undefined) {
    const stock = inStock === "true";
      const result = filteredProducts.filter((p) => (p.inStock = stock));
      
  }
  // PAGINATION
  const start = (page - 1) * Number(limit);
  const end = start + Number(limit);
  const result = filteredProducts.slice(start, end);
  res.status(200).json(result);
};

const getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(400).json({ message: "product nit found" });
  }
  res.status(200).json(product);
};
const createProduct = (req, res) => {
  const { name, price, category, inStock } = req.body;
  const newProduct = {
    id: filteredProducts.length + 1,
    name,
    price,
    category,
    inStock: inStock ?? true, // default true
  };
  filteredProducts.push(newProduct);
};
const updateProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = filteredProducts.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const { name, price, category, inStock } = req.body;
  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.category = category ?? product.category;
  product.inStock = inStock ?? product.inStock;
  res.json(product);
};
const deleteProductById = (req, res) => {
  const id = Number(req.params.id);
  const index = filteredProducts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  filteredProducts.splice(index, 1);

  res.json({ message: "Product deleted" });
};
module.exports = {
  getAllProducts,
    getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
