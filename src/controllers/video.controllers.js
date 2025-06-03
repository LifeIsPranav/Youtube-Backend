const { uploadVideo, seeVideo, getAllVideos, updateVideo, deleteVideo, getMyVideos, getVideosOnCategory, getVideosOnTag } = require("../repository/videos.repository")
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
    msg: "All videos 🔥",
    total: videos.length,
    videos: videos
  })
}

const updateVideoCtr = async (req, res) => {

  const det = await updateVideo(req.videoUrl, req.body)
  console.log("Video Updated Successfully")

  res.json({
    msg: "Video Updated Successfully",
    newDetails: det
  })

}

const deleteVideoCtr = async (req, res) => {

  await deleteVideo(req.videoUrl);
  console.log("Video Deleted Sucessfully ✅")

  res.json({
    msg: "Video Deleted Successfully!"
  })
}

const getMyVideosCtr = async (req, res) => {

  const videos = await getMyVideos(req.email)

  res.json({
    msg: "Here are all your Videos: ✌️",
    total: videos.length,
    videos: videos
  })
}

const getVideosByCategoryCtr = async (req, res) => {
  const videos = await getVideosOnCategory(req.params.category)
  
  res.json({
    msg: `Here are all videos of Category: ${req.params.category}`,
    videos: videos
  })
}

const getVideosByTagCtr = async (req, res) => {
  const videos = await getVideosOnTag(req.params.tag)
  
  res.json({
    msg: `Here are all videos of Tag: ${req.params.tag}`,
    videos: videos
  })
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