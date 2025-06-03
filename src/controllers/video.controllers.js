const { uploadVideo, seeVideo, getAllVideos } = require("../repository/videos.repository")
const { VideoSchemaValidator } = require("../validators/video.validators")


const uploadVideoCtr = async (req, res) => {

  const { data, error } = VideoSchemaValidator.safeParse(req.body)
  if(error) throw error

  const video = await uploadVideo(req.email, data)
  console.log("Video Uploaded Successfully!")

  res.json({
    msg: "Video Uploaded Succesfully, Now you can watch it!"
  })

}

const getCreatorCtr = async (req, res) => {
  const vid = await seeVideo(req.params.videoUrl)

  res.json({
    msg: "Hi from Generate Creator Controller",
    creatorOfVideo: vid.channelName
  })
}

const watchVideo = async (req, res) => {
  const det = await seeVideo(req.params.videoUrl)
  res.json({
    msg: "Enjoy watching!",
    video: det
  })
}

const allVideoCtr = async (req, res) => {
  const videos = await getAllVideos()
  res.json({
    msg: "Here are all your videos",
    total: videos.length,
    videos: videos
  })
}

const updateVideoCtr = async (req, res) => {

}

const deleteVideoCtr = async (req, res) => {

}

const getMyVideosCtr = async (req, res) => {

}

const getVideosByCategoryCtr = async (req, res) => {

}

const getVideosByTagCtr = async (req, res) => {

}


module.exports = {
  uploadVideoCtr,
  getCreatorCtr,
  watchVideo,
  allVideoCtr,
  updateVideoCtr,
  deleteVideoCtr,
  getMyVideosCtr,
  getVideosByCategoryCtr,
  getVideosByTagCtr
}