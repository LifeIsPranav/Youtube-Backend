const jwt = require('jsonwebtoken')

const { configJWTOptions, cookieTokenName } = require('../config/jwt.config')
const { jwt_secret_key } = require('../env')


const createAndSetTokenForLogin = (req, res) => {

  const payload = { email: req.body.email }
  const options = configJWTOptions

  const secretKey = jwt_secret_key

  const token = jwt.sign(payload, secretKey, options)
  res.cookie(cookieTokenName, token)
}

const clearCookies = (res) => {
  res.clearCookie(cookieTokenName)
}


module.exports = {
  createAndSetTokenForLogin,
  clearCookies
}