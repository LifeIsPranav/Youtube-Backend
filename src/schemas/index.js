const commentModel = require("./comments.schema");
const userModel = require("./users.schema");
const VideoModel = require("./video.schema");


module.exports = {
  Comments: commentModel,
  Users: userModel,
  Videos: VideoModel
}