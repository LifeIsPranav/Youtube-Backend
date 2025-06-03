const express = require('express')

const { uploadVideoCtr, getCreatorCtr, watchVideo, allVideoCtr, deleteVideoCtr, getMyVideosCtr, getVideosByCategoryCtr, getVideosByTagCtr } = require('../controllers/video.controllers')
const authMiddleware = require('../middlewares/auth.middleware')
const { errorMiddleware } = require('../error/errormiddleware')


const videoRouter = express.Router()

videoRouter.get('/all', allVideoCtr)
videoRouter.get('/categories/:category', getVideosByCategoryCtr)
videoRouter.get('/watch/:videoUrl', watchVideo)
videoRouter.get('/creator/:videoUrl', getCreatorCtr)
videoRouter.get('/tags/:tag', getVideosByTagCtr)


videoRouter.use(authMiddleware)

videoRouter.get('/myVideos', getMyVideosCtr)
videoRouter.post('/upload', uploadVideoCtr)
videoRouter.put('/update/:videoURL', uploadVideoCtr)
videoRouter.delete('/delete', deleteVideoCtr)

videoRouter.use(errorMiddleware)


module.exports = videoRouter