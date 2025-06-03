const { uploadVideo, seeVideo } = require("../repository/videos.repository")
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

module.exports = {
  uploadVideoCtr,
  getCreatorCtr
}