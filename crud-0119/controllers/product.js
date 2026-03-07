// const { Product } = require("../models/product");

const { default: slugify } = require("slugify");
const { Product } = require("../models/product");

// const getAllProducts =async (req, res) => {
//   const product = await Product.find();
//   res.status(200).send(product)
//   console.log(filteredProducts);
//   re.status(200).json({
//     dataLength:product.length,
//     data:product
//   })
    
//   //   const {
//   //       name,
//   //       category,
//   //       price,
//   //   search,
//   //   sort,
//   //   inStock,
//   //   page = 1,
//   //   limit = 5,
//   // } = req.query;

//   //!name
//   if (name) {
//     const result = filteredProducts.filter(
//       (p) => p.name.toLowerCase() === name.toLowerCase(),
//     );
//   }
//   //!category
//   if (category) {
//     result = filteredProducts.filter(
//       (p) => p.category.toLowerCase() === category.toLowerCase(),
//     );
//   }
//   //!price
//   if (price) {
//     result = filteredProducts.price((p) => p.price === price);
//   }
//   //!search
//   if (search) {
//     const result = filteredProducts.filter((p) =>
//       p.name.toLowerCase().includes(search.toLowerCase()),
//     );
//     res.status(200).json(result);
//     }
//   //!search
//   if (sort) {
//     result.sort((a, b) => {
//       // number field (price, rating, id)
//       if (typeof a[sort] === "number") {
//         return a[sort] - b[sort];
//       }

//       // string field (name)
//       if (typeof a[sort] === "string") {
//         return a[sort].localeCompare(b[sort]);
//       }

//       return 0;
//     });
//   }
//   //!instock
//   if (!inStock !== undefined) {
//     const stock = inStock === "true";
//       const result = filteredProducts.filter((p) => (p.inStock = stock));
      
//   }
//   // PAGINATION
//   const start = (page - 1) * Number(limit);
//   const end = start + Number(limit);
//   const result = filteredProducts.slice(start, end);
//   res.status(200).json(result);
// };

// const getProductById = (req, res) => {
//   const id = Number(req.params.id);
//   const product = products.find((p) => p.id === id);
//   if (!product) {
//     return res.status(400).json({ message: "product nit found" });
//   }
//   res.status(200).json(product);
// };
// const createProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);

//     const result = await product.save();

//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({
//       message: "Product yaradılarkən xəta baş verdi",
//       error: error.message,
//     });
//   }
// };
// const updateProductById = (req, res) => {
//   const id = Number(req.params.id);
//   const product = filteredProducts.find((p) => p.id === id);
//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }
//   const { name, price, category, inStock } = req.body;
//   product.name = name ?? product.name;
//   product.price = price ?? product.price;
//   product.category = category ?? product.category;
//   product.inStock = inStock ?? product.inStock;
//   res.json(product);
// };
// const deleteProductById = (req, res) => {
//   const id = Number(req.params.id);
//   const index = filteredProducts.findIndex((p) => p.id === id);

//   if (index === -1) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   filteredProducts.splice(index, 1);

//   res.json({ message: "Product deleted" });
// };


const createProduct = async (req, res) => {
  try {
    const { title, price,desc, category: categoryId, stock } = req.body;
    if (!categoryId) {
      return res.status(400).json({ message: "Category tələb olunur" });
    }
    const product = new Product({
      title,
      price,
      desc,
      stock: stock ?? true,
      category: categoryId, // Category ObjectId
      productID: slugify(title) + "-" + crypto.randomUUID().slice(0, 8),
    });

    // product.productID =
    //   slugify(req.body.title) + "-" + crypto.randomUUID().slice(0, 8);

    const result = await product.save();

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Product yaradılarkən xəta baş verdi",
      error: error.message,
    });
  }
};
const getAllProducts = async (req, res) => {
  try {
   const products = await Product.find().populate("category", "name slug"); 

    res.status(200).json({
      results: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ productID: req.params.id });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ productID: req.params.id });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // title dəyişərsə slug yenilə
    if (req.body.title) {
      product.productID =
        slugify(req.body.title) + "-" + crypto.randomUUID().slice(0, 8);
    }

    Object.assign(product, req.body);

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      productID: req.params.id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
    getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
