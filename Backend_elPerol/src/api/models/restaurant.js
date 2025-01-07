const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    schedule: { type: String, required: true },
    recipes_created: [
      { type: mongoose.Types.ObjectId, required: false, ref: 'recipes' }
    ],
    recipes_liked: [
      { type: mongoose.Types.ObjectId, required: false, ref: 'recipes' }
    ],
    restaurants_liked: [
      { type: mongoose.Types.ObjectId, required: false, ref: 'restaurants' }
    ],
    likes: { type: Number, required: true, default: 0 },
    phrases: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length === 3
        },
        message: 'phrases must be an array of exactly 3 strings'
      },
      default: ['', '', '']
    },
    rol: {
      type: String,
      enum: ['admin', 'user', 'restaurant'],
      required: true,
      default: 'restaurant'
    },
    verified: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, collection: 'restaurants' }
)

const Restaurant = mongoose.model(
  'restaurants',
  restaurantSchema,
  'restaurants'
)

module.exports = Restaurant
