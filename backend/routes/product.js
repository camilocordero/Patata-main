const express = require('express');
const verifyToken = require('./validateToken');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');

const api = express.Router();

api.post('/product', verifyToken, addProduct);
api.get('/products', getProducts);
api.put('/product', verifyToken, updateProduct);
api.delete('/product', verifyToken, deleteProduct);

module.exports = api;
