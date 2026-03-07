const express = require('express');
const app = express();
const port = 3000;

//!middleware starts
app.use(express.json());
//!middleware end
const productRouter = require('./routes/product');
// const categoryRouter = require('./routes/categories');

// app.use('/category', categoryRouter);
app.use('/products', productRouter);
app.use('/', (req,res) => {
    res.status(200).send("app start")
})


app.listen(port, () => {
    console.log(`app listen to ${port} port`);
    
})