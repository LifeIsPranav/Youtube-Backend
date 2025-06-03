const express = require('express')

const { uploadVideoCtr, getCreatorCtr, watchVideo, allVideoCtr } = require('../controllers/video.controllers')
const authMiddleware = require('../middlewares/auth.middleware')
const { errorMiddleware } = require('../error/errormiddleware')


const videoRouter = express.Router()

videoRouter.use(authMiddleware)
videoRouter.post('/upload', uploadVideoCtr)
videoRouter.get('/all', allVideoCtr)
videoRouter.get('/watch/:videoUrl', watchVideo)
videoRouter.get('/:videoUrl', getCreatorCtr)
videoRouter.use(errorMiddleware)

module.exports = videoRouter