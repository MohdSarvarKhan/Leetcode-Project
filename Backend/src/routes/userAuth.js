const express = require('express');
const {register,login,logout,getProfile} = require('../controller/userAuthent');

const authRouter = express.Router();
const userMiddleware = require('../middleware/userMiddleware');

// Register
// login
// logout
// getProfile


authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
authRouter.get('/getProfile',getProfile);

module.exports = authRouter;