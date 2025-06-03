const express = require('express')

const { uploadVideoCtr } = require('../controllers/video.controllers')
const authMiddleware = require('../middlewares/auth.middleware')
const { errorMiddleware } = require('../error/errormiddleware')


const videoRouter = express.Router()

videoRouter.use(authMiddleware)
videoRouter.use('/upload', uploadVideoCtr)
videoRouter.use(errorMiddleware)

module.exports = videoRouter