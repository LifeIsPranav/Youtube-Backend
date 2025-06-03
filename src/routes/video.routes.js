const express = require('express')

const { uploadVideoCtr, getCreatorCtr, watchVideo, allVideoCtr, deleteVideoCtr, getMyVideosCtr, getVideosByCategoryCtr, getVideosByTagCtr, updateVideoCtr } = require('../controllers/video.controllers')
const { errorMiddleware } = require('../error/errormiddleware')
const authMiddleware = require('../middlewares/auth.middleware')
const myVideosMiddleware = require('../middlewares/auth.myvideos.middleware')


const videoRouter = express.Router()

videoRouter.get('/all', allVideoCtr)
videoRouter.get('/categories/:category', getVideosByCategoryCtr)
videoRouter.get('/watch/:videoUrl', watchVideo)
videoRouter.get('/creator/:videoUrl', getCreatorCtr)
videoRouter.get('/tags/:tag', getVideosByTagCtr)


videoRouter.use(authMiddleware)

videoRouter.get('/myVideos', getMyVideosCtr)
videoRouter.post('/upload', uploadVideoCtr)

videoRouter.use(myVideosMiddleware)

videoRouter.put('/update/:videoUrl', updateVideoCtr)
videoRouter.delete('/delete/:videoUrl', deleteVideoCtr)

videoRouter.use(errorMiddleware)


module.exports = videoRouter