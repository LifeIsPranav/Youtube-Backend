const { findUser } = require("../repository/users.repository");
const { checkIsOwner } = require("../repository/videos.repository");
const getDetailsOfUserWOPassword = require("../utils/getDetailsWOpassword.users");

const myVideosMiddleware = async (req, res, next) => {
  const user = getDetailsOfUserWOPassword(await findUser(req.email))
  if(!(await checkIsOwner(user, req.params.videoUrl))) 
  throw Error("You cannot modify Anyone Else's Video ❌")

  req.userId = user._id
  req.videoUrl = req.params.videoUrl
  next()
}

module.exports = myVideosMiddleware