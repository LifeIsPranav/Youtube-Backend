const { signup, signin, getMyProfile, getProfile, logout, updateProfile, subscribeChan } = require("./user.controllers");

module.exports = {
  SignUpController: signup,
  LoginController: signin,
  SignInController: signin,
  GetMyProfileController: getMyProfile,
  GetProfileController: getProfile,
  LogoutController: logout,
  UserUpdateController: updateProfile,
  SubscribeChannelController: subscribeChan
}