const bcrypt = require('bcrypt')

const { addNewUser, checkIfUserExists, findUser, getUserByChannelName, updateMyProfile, subscribeChannel } = require('../repository/users.repository')
const { UserSchemaValidator, UserLoginValidator, UpdationSchemaValidator } = require ("../validators")
const { createAndSetTokenForLogin, clearCookies } = require('../services/jwt.service')
const getDetailsOfUserWOPassword = require('../utils/getDetailsWOpassword.users')


const signup = async (req, res) => {

  const {_, error} = UserSchemaValidator.safeParse(req.body)
  if(error) throw error
  
  await checkIfUserExists(req.body.email)
  const doesUserExist = await checkIfUserExists(req.body.email)
  if(doesUserExist) throw new Error("User Alredy Exists!")

  req.body.password = await bcrypt.hash(req.body.password, 10)

  const user = await addNewUser(req)
  console.log("New User Added")

  const user_det = getDetailsOfUserWOPassword(user)
  console.log("User Details: ", user_det)
  console.log()

  createAndSetTokenForLogin(req, res)

  res.json({
    msg: "User Created", 
    userDetails: user_det
  })
}

const signin = async (req, res) => {

  const {_, error} = UserLoginValidator.safeParse(req.body)
  if(error) throw error
  
  const user = await findUser(req.body.email)
  if(!user) throw new Error("User Doesn't Exists, Create One First!")

  const matchPass = bcrypt.compare(req.body.password, user.password)
  if(!matchPass) throw new Error("Invalid PassWord!")

  const userObj = getDetailsOfUserWOPassword(user)

  createAndSetTokenForLogin(req, res)
  res.json({
    msg: "Successfully Signed in!",
    user: userObj
  })

}

const logout = (req, res) => {
  clearCookies(res)
  res.json({msg: "Done Clearing Cookies!"})
}

const getMyProfile = async (req, res) => {
  const user = await findUser(req.email)
  const userDet = getDetailsOfUserWOPassword(user)
  res.json({
    msg: "Here is your User (getMyProfile controller)",
    user: userDet
  })
}

const getProfile = async (req, res) => {
  const user_det = await getUserByChannelName(req.params.channelname)
  if(!user_det) throw Error("No Such User Exists!")

  res.json({
    msg: "From Get Profile Controller",
    user_details: user_det
  })
}

const updateProfile = async (req, res) => {

  const {_, error} = UpdationSchemaValidator.safeParse(req.body)
  if(error) throw error 
  
  const { channelName } = req.body
  if(channelName){
    const existingUser = (await getUserByChannelName(channelName))

    if(existingUser && existingUser.channelName == channelName)
    throw new Error("Channel with this name Already Exists, Kindly Change it!")
  }
  
  newUserDet = await updateMyProfile(req);
  res.json({
    msg: "Updated Your Profile!",
    new_user_details: newUserDet
  })
}

const subscribeChan = async (req, res) => {
  const userMail = req.email
  const channelName = req.params.channelName
  const user = await subscribeChannel(userMail, channelName)

  console.log(`${userMail} Successfully Subscribed to channel: ${channelName}`)

  res.json({
    msg: `${userMail} Successfully Subscribed to channel: ${channelName}`
  })
}


module.exports = {
  signup,
  signin,
  getMyProfile,
  getProfile,
  logout, 
  updateProfile,
  subscribeChan
}