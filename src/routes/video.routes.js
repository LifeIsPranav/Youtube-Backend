const express = require('express')

const { uploadVideoCtr, getCreatorCtr } = require('../controllers/video.controllers')
const authMiddleware = require('../middlewares/auth.middleware')
const { errorMiddleware } = require('../error/errormiddleware')


const videoRouter = express.Router()

videoRouter.use(authMiddleware)
videoRouter.post('/upload', uploadVideoCtr)
videoRouter.post('/:videoUrl', getCreatorCtr)
videoRouter.use(errorMiddleware)

module.exports = videoRouter