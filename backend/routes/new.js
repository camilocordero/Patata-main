const express = require('express');
const verifyToken = require('./validateToken');
const { addNew, getNews, updateNew, deleteNew } = require('../controllers/newController');

const api = express.Router();

api.get('/news', getNews);
api.post('/new', verifyToken, addNew);
api.put('/new', verifyToken, updateNew);
api.delete('/new', verifyToken, deleteNew);

module.exports = api;
