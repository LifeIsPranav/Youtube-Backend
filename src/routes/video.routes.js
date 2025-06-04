const express = require('express')

const { uploadVideoCtr, getCreatorCtr, watchVideo, allVideoCtr, deleteVideoCtr, getMyVideosCtr, getVideosByCategoryCtr, getVideosByTagCtr, updateVideoCtr, likeVideoCtr, dislikeVideoCtr } = require('../controllers/video.controllers')
const { errorMiddleware } = require('../error/errormiddleware')
const authMiddleware = require('../middlewares/auth.middleware')
const myVideosMiddleware = require('../middlewares/auth.myvideos.middleware')


const videoRouter = express.Router()

videoRouter.get('/all', allVideoCtr)
videoRouter.get('/watch/:videoUrl', watchVideo)
videoRouter.get('/tags/:tag', getVideosByTagCtr)
videoRouter.get('/creator/:videoUrl', getCreatorCtr)
videoRouter.get('/categories/:category', getVideosByCategoryCtr)


videoRouter.use(authMiddleware)

videoRouter.post('/upload', uploadVideoCtr)
videoRouter.get('/myVideos', getMyVideosCtr)
videoRouter.put('/like/:videoUrl', likeVideoCtr)
videoRouter.put('/dislike/:videoUrl', dislikeVideoCtr)

videoRouter.put('/update/:videoUrl', myVideosMiddleware, updateVideoCtr)
videoRouter.delete('/delete/:videoUrl', myVideosMiddleware, deleteVideoCtr)

videoRouter.use(errorMiddleware)


module.exports = videoRouter