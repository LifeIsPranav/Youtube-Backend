const express = require('express')

const { addCommentController, getCommentsOnVideoCtr } = require('../controllers/comments.controllers')
const { errorMiddleware } = require('../error/errormiddleware')
const authMiddleware = require('../middlewares/auth.middleware')

const commentRouter = express.Router()


commentRouter.get('/get/:videoUrl', getCommentsOnVideoCtr)

commentRouter.use(authMiddleware)

commentRouter.post('/post/:videoUrl', addCommentController)

commentRouter.use(errorMiddleware)



module.exports = commentRouter