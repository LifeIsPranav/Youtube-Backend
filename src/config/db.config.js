const { default: mongoose } = require("mongoose");
const { mongoUrl } = require("../env");

const connectDB = async () => {
  await mongoose.connect(mongoUrl)
  console.log("MongoDB connected 🔥")
}

module.exports = {
  connectDB
}