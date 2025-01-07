const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    recipes_created: [
      { type: mongoose.Types.ObjectId, required: false, ref: 'recipes' }
    ],
    recipes_liked: [
      { type: mongoose.Types.ObjectId, required: false, ref: 'recipes' }
    ],
    restaurants_liked: [
      { type: mongoose.Types.ObjectId, required: false, ref: 'restaurants' }
    ],
    rol: {
      type: String,
      enum: ['admin', 'user', 'restaurant'],
      required: true,
      default: 'user'
    }
  },
  { timestamps: true, collection: 'users' }
)

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('users', userSchema, 'users')

module.exports = User
