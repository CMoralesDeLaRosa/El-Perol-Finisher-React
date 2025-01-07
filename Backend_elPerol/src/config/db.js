const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('BBDD connected')
  } catch (error) {
    console.log('BBDD not connected')
  }
}

module.exports = { connectDB }
