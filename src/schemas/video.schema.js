const { default: mongoose } = require("mongoose");

const VideoSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, "Video ID cannot be emply!"]
  },
  
  videoUrl: {
    type: String,
    required: [true, "Video URL cannot be emply!"]
  },

  thumbnail_url: {
    type: String,
    default: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Wyatt'
  },

  category: {
    type: String,
    enum: ['food', 'travel', 'fight', 'study', 'college', 'comedy'],
    default: 'study'
  },

  tags: {
    type: [{
      type: String,
      required: true
    }],
    default: ['all']
  },

  views: {
    type: Number,
    default: 0
  },

  likes: {
    type: Number,
    default: 0
  },

  dislikes: {
    type: Number,
    default: 0
  },
  
  likedBy: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }],
    default: []
  },

  dislikedBy: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }],
    default: []
  },
  
  viewedBy: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }],
    default: []
  },

}, {timestamps: true})


const VideoModel = mongoose.model("Video", VideoSchema)
module.exports = VideoModel