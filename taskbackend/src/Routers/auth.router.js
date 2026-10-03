const express = require('express')
const authRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const authController = require('../controllers/auth.controller')
authRouter.get('/auth-me',authMiddleware,authController.authMeController);
authRouter.post('/register',authController.registerController)
authRouter.post('/login',authController.loginController)

authRouter.post('/logout',authMiddleware,authController.logoutController)

module.exports = authRouter;  
