const getDetailsOfUserWOPassword = (user) => {
  const userObj = user.toObject()
  delete userObj.password
  return userObj
}

module.exports = getDetailsOfUserWOPassword