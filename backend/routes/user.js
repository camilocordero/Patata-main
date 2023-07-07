const express = require('express');
const verifyToken = require('./validateToken');
const { logginUser, addUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');

const api = express.Router();

api.post('/logging', logginUser);
api.post('/user', addUser);
api.get('/users', verifyToken, getUsers);
api.put('/user', verifyToken, updateUser);
api.delete('/user', verifyToken, deleteUser);

module.exports = api;
