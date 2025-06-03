const { checkIsOwner } = require("../repository/videos.repository")

const myVideosMiddleware = async (req, res, next) => {
  const user = getDetailsOfUserWOPassword(await findUser(req.email))
  if(!checkIsOwner(user, req.params.videoUrl)) 
  throw Error("You cannot modify Anyone Else's Video ❌")

  req.userId = user._id
  next()
}