const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    name: { type: String, required: true },
    region: { type: String, required: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['Fácil', 'Media', 'Difícil']
    },
    time: { type: Number, required: true },
    portions: { type: Number, required: true },
    ingredients: { type: [String], required: true },
    elaboration: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    verified: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, collection: 'recipes' }
)

const Recipe = mongoose.model('recipes', recipeSchema, 'recipes')

module.exports = Recipe
