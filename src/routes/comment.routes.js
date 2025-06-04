const express = require('express')

const { addCommentController } = require('../controllers/comments.controllers')
const { errorMiddleware } = require('../error/errormiddleware')
const authMiddleware = require('../middlewares/auth.middleware')

const commentRouter = express.Router()


commentRouter.use(authMiddleware)

commentRouter.post('/post/:videoUrl', addCommentController)

commentRouter.use(errorMiddleware)



module.exports = commentRouter