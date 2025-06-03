const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({

  channelName: {
    type: String, 
    required: [true, "Channel name is required!"],
    unique: true
  },

  phone: {
    type: String,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  
  email: {
    type: String,
    unique: true,
    required: [true, "Email cannot be empty"]
  },

  password: {
    type: String,
    required: [true, "Pasword is Required"]
  }, 

  logo: {
    type: String,
    default: 'https://avatar.iran.liara.run/public'
  },

  subscribers: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],

  subscribedChannels: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }]

}, {timestamps: true})


const userModel = mongoose.model("User", UserSchema)
module.exports = userModel