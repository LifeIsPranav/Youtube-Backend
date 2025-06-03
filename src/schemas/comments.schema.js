const { default: mongoose } = require("mongoose");

const CommentSchema = new mongoose.Schema({

  videoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Video',
    required: [true, "Video ID cannot be emply!"],
    unique: true
  },

  commentText: {
    type: String,
    required: [true, "Cannot post empty String!"]
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }

}, {timestamps: true})


const commentModel = mongoose.model("Comment", CommentSchema)
module.exports = commentModel