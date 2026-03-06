const express = require('express');
const route = express.Router();

//todo
//crud emeliyati (c-r-u-d );


route.get('/', (req, res) => {
    res.status(200).send('Home page');
} )



module.exports =  route ;