const { Users, Videos, Comments } = require("../schemas");

const addNewComment = async (email, videoUrl, commentStr) => {

  const video = await Videos.findOne({videoUrl})
  const user = await Users.findOne({email})

  if(!video) throw new Error("No such Video!")
  if(!user) throw new Error("Invalid User")

  const comment = new Comments({
    videoId: video._id,
    commentText: commentStr,
    userId: user._id
  })

  await comment.save()

};


module.exports = {
  addNewComment
}