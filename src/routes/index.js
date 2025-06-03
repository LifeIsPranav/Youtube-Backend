const express = require('express')

const userRouter = require('./user.routes')
const videoRouter = require('./video.routes')
const commentRouter = require('./comment.routes')

const router = express.Router()

router.use('/users', userRouter)
router.use('/videos', videoRouter)
router.use('/comments', commentRouter)


module.exports = router