const { Users, Videos } = require("../schemas");
const filterVideo = require("../utils/filter.videos");
const { findUser } = require("./users.repository");


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

const deleteVideo = async (videoUrl) => {
  const video = await Videos.findOneAndDelete({videoUrl})
  if(!video) throw new Error("No such Video Found!")
}

const updateVideo = async (videoUrl, updatedDet) => {
  const { thumbnail_url, category, tags } = updatedDet

  const video = await Videos.findOneAndUpdate({videoUrl}, {
    ...(thumbnail_url && {thumbnail_url}),
    ...(category && {category}),
    ...(tags && {tags})
  }, {new: true})

  return video
  
}

const getCreator = async (videoUrl) => {

  const video = await Videos.findOne({videoUrl})
  const user = await Users.findById(video.userId)

  return user.channelName
}

const seeVideo = async (videoUrl) => {
  const video = await Videos.findOne({videoUrl})
  if(!video) throw new Error("Video Not Found!")
  
  video.views += 1
  await video.save()

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

const checkIsOwner = async (user, videoUrl) => {
  const video = await Videos.findOne({videoUrl})
  if(!video) throw Error("No video Found!")

  console.log(video.userId)
  console.log(user._id)
  console.log("***************")

  if(video.userId.equals(user._id)) return true
  return false
}

const getMyVideos = async (userMail) => {
  const user = await findUser(userMail)
  const userId = user._id

  const videos = Videos.find({userId})
  return videos
}

const getVideosOnCategory = async (category) => {
  return await Videos.find({category})
}

const getVideosOnTag = async (tag) => {
  return await Videos.find({tags: tag})
}

const likeVideo = async (userMail, videoUrl) => {
  const user = await Users.findOne({email: userMail})
  if (!user) throw new Error("User not found!");

  const video = await Videos.findOne({videoUrl})
  if (!video) throw new Error("Video not found!");

  if(video.likedBy.includes(user._id)) return false

  if(video.dislikedBy.includes(user._id)){
    video.dislikedBy.pull(user._id)
    video.dislikes = video.dislikedBy.length
  }

  video.likedBy.push(user._id)
  video.likes = video.likedBy.length

  await video.save()
  return true
}

const dislikeVideo = async (userMail, videoUrl) => {
  const user = await Users.findOne({email: userMail})
  if (!user) throw new Error("User not found!");

  const video = await Videos.findOne({videoUrl})
  if (!video) throw new Error("Video not found!");

  if(video.dislikedBy.includes(user._id)) return false

  if(video.likedBy.includes(user._id)){
    video.likedBy.pull(user._id)
    video.likes = video.likedBy.length
  }

  video.dislikedBy.push(user._id)
  video.dislikes = video.dislikedBy.length

  await video.save()
  return true
}

module.exports = {
  uploadVideo,
  deleteVideo,
  updateVideo,
  getCreator,
  seeVideo,
  getAllVideos,
  checkIsOwner,
  getMyVideos,
  getVideosOnCategory,
  getVideosOnTag,
  likeVideo,
  dislikeVideo
}