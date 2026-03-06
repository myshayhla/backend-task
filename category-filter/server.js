const express = require("express");
const app = express();
const port = 3000;

//!middleware starts
express.json();
//!middleware ends

//routeri tanidiriq ;)
const homeRouter = require("./routes/home.js");
const productRouter = require("./routes/product.js");
const contactRouter = require("./routes/contact.js");

// app.use('/contact', contactRouter);
app.use('/products', productRouter);
app.use("/", homeRouter);

app.listen(port, () => {
  console.log(`localhost listenig to ${port} port`);
});
