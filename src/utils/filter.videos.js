const filterVideo = (video, channelName) => {
  const videoObj = user.toObject()

  delete videoObj.userId
  delete videoObj._id
  videoObj.channelName = channelName

  return videoObj
}

module.exports = filterVideo