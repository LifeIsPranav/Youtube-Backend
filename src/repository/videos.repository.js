const { Users, Videos } = require("../schemas");
const filterVideo = require("../utils/filter.videos");


const uploadVideo = async (userMail, videoDet) => {

  const { videoUrl, thumbnail_url, category, tags } = videoDet
  const user = await Users.findOne({email: userMail})

  const newVideo = new Videos({
    userId: user._id,
    videoUrl,
    thumbnail_url,
    category,
    tags
  })

  await newVideo.save()

  return newVideo
}

const deleteVideo = async (userMail, videoUrl) => {

}

const updateVideo = async (userMail, videoUrl, updatedDet) => {

}

const getCreator = async (videoUrl) => {

  const video = await Videos.findOne({videoUrl})
  const user = await Users.findById(video.userId)

  return user.channelName
}

const seeVideo = async (videoUrl) => {
  const video = await Videos.findOne({videoUrl})
  const creator = await getCreator(videoUrl)

  return filterVideo(video, creator)
}

const getAllVideos = async () => {
  const videosArr = await Videos.find({})
  const videos = await Promise.all(
    videosArr.map((video) => seeVideo(video.videoUrl))
  )
  
  return videos
}


module.exports = {
  uploadVideo,
  deleteVideo,
  updateVideo,
  getCreator,
  seeVideo,
  getAllVideos
}