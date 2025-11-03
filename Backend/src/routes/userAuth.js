const express = require('express');
const {register,login,logout} = require('../controller/userAuthent')
const authRouter = express.Router();

// Register
// login
// logout
// getProfile


authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
// authRouter.get('/getProfile',getProfile);

module.exports = authRouter;