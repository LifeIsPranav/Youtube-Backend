const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT
const MONBO_DB_URL = process.env.MONBO_DB_URL
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

module.exports = {
  port: PORT,
  mongoUrl: MONBO_DB_URL,
  jwt_secret_key: JWT_SECRET_KEY
}