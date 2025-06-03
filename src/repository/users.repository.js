const { Users } = require("../schemas");
const getDetailsOfUserWOPassword = require("../utils/getDetailsWOpassword.users");
const getLimitedDetailsOfUser = require("../utils/getLimitedDetails.users");


const addNewUser = async (req) => {
  const {channelName, phone, email, password, logo} = req.body
  const newUser = new Users ({
    channelName,
    phone,
    email,
    password, 
    logo
  })
  
  await newUser.save()
  return newUser
}

const checkIfUserExists = async (email) => {
  const user = await Users.findOne({email})
  if(!user) return false
  return true
}

const findUser = async (email) => {
  return await Users.findOne({email})
}

const getUserByChannelName = async (channelName) => {
  const user = await Users.findOne({channelName})
  if(!user) return null
  return getLimitedDetailsOfUser(user)
}

const updateMyProfile = async (req) => { 

  const {channelName, phone, password, logo} = req.body
  const user = await Users.findOneAndUpdate({email: req.email}, {
    ...(logo && { logo }),
    ...(phone && { phone }),
    ...(password && { password }),
    ...(channelName && { channelName }),
  },{new: true})

  return getDetailsOfUserWOPassword(user)
}

const subscribeChannel = async (userMail, subscribeToChannel) => {

  const myChannel = await Users.findOne({email: userMail})
  const channelUser = await Users.findOne({channelName: subscribeToChannel})
  if(!channelUser) throw Error ("This Channel Doesn't Exist!")
  
  const user1 = await Users.findOneAndUpdate(
    { email: userMail }, 
    { $addToSet: { subscribedChannels: channelUser._id } },
    { new: true }
  )

  const user2 = await Users.findOneAndUpdate(
    { channelName: subscribeToChannel }, 
    { $addToSet: { subscribers: myChannel._id } },
    { new: true }
  )

  const det1 = getDetailsOfUserWOPassword(user1)
  const det2 = getDetailsOfUserWOPassword(user2)
  return {det1, det2}
}


module.exports = {
  addNewUser,
  checkIfUserExists,
  findUser,
  getUserByChannelName,
  updateMyProfile,
  subscribeChannel
}
