const express = require('express')

const { SignUpController, SignInController, LoginController, GetMyProfileController, GetProfileController, LogoutController, UserUpdateController, SubscribeChannelController } = require('../controllers')
const authMiddleware = require('../middlewares/auth.middleware')

const userRouter = express.Router()

userRouter.post('/signup', SignUpController)
userRouter.post('/signin', SignInController)
userRouter.post('/login', LoginController)
userRouter.get('/profile/:channelname', GetProfileController)

userRouter.use(authMiddleware)
userRouter.get('/myprofile', GetMyProfileController)
userRouter.post('/logout', LogoutController)
userRouter.put('/update', UserUpdateController)
userRouter.put('/subscribe/:channelName', SubscribeChannelController)

module.exports = userRouter