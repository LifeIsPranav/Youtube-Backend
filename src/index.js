const express = require('express')
const cookieParser = require('cookie-parser');

const router = require('./routes')
const { port } = require('./env')
const { connectDB } = require('./config/db.config')
const { errorMiddleware } = require('./error/errormiddleware')


const app = express()
const PORT = port

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router)
app.use(errorMiddleware)


app.listen(PORT, async () => {
  console.log(`Server Connected on Port: ${PORT} 🔥`)
  await connectDB()
  console.log()
})