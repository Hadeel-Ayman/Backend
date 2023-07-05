const express = require('express');
const authRouter = express.Router();
const { register, login, logout } = require('../controllers/authController');


// register
authRouter.post('/register', register)


// login
authRouter.post('/login', login)

// logout
authRouter.delete('/logout', logout)


module.exports = authRouter