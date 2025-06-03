const { Users, Videos } = require("../schemas");


const uploadVideo = async (userMail, videoDet) => {

  const { videoUrl, thumbnail_url, category, tags } = videoDet
  const user = Users.findOne({userMail})

  const newVideo = new Videos({
    userId: user.userId,
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


module.exports = {
  uploadVideo,
  deleteVideo,
  updateVideo
}