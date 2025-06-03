const getLimitedDetailsOfUser = (user) => {
  const userObj = user.toObject()

  delete userObj.password
  delete userObj._id
  delete userObj.email

  return userObj
}

module.exports = getLimitedDetailsOfUser