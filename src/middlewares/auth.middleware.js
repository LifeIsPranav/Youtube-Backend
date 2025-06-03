const jwt = require('jsonwebtoken')

const { cookieTokenName } = require("../config/jwt.config");
const { jwt_secret_key } = require("../env");


const authMiddleware = (req, res, next) => {

  const jwtToken = req.cookies[cookieTokenName]

  try{
    const decoded = jwt.verify(jwtToken, jwt_secret_key)
    req.email = decoded.email
    next();

  } catch (error) {
    throw new Error("Invalid User - Token Unverified or Empty, Kindly Signin!")
  }
}

module.exports = authMiddleware