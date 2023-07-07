const express = require('express');
const verifyToken = require('./validateToken');
const { addCupon, getCupons, updateCupon, deleteCupon } = require('../controllers/cuponController');

const api = express.Router();

api.get('/cupons', verifyToken, getCupons);
api.post('/cupon', verifyToken, addCupon);
api.put('/cupon', verifyToken, updateCupon);
api.delete('/cupon', verifyToken, deleteCupon);

module.exports = api;
