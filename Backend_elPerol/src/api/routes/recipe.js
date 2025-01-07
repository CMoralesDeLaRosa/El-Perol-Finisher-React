const express = require('express')
const { isAdmin, isAuth } = require('../../middlewares/auth')
const { upload } = require('../../middlewares/file')
const {
  getRecipes,
  getRecipesNotVerified,
  getRecipeById,
  postRecipe,
  validateRecipe,
  deleteRecipe,
  updateRecipeLikes
} = require('../controllers/recipes/recipeController')

const recipeRouter = express.Router()

recipeRouter.get('/not-verified', isAdmin, getRecipesNotVerified)
recipeRouter.get('/:id', getRecipeById)
recipeRouter.get('/', getRecipes)
recipeRouter.put('/validate/:id', isAdmin, validateRecipe)
recipeRouter.post('/', isAuth, upload('recipes').single('img'), postRecipe)
recipeRouter.put('/:id/like', isAuth, updateRecipeLikes)
recipeRouter.delete('/:id', isAuth || isAdmin, deleteRecipe)

module.exports = recipeRouter
