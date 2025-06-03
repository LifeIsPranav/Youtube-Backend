const configJWTOptions = {
  expiresIn: '20h',  // Token will expire in 1 hour
  algorithm: 'HS256' // Algorith used!
}

const cookieTokenName = 'jwtToken'

module.exports = {
  configJWTOptions,
  cookieTokenName
}