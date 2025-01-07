const mongoose = require('mongoose')
const { deleteFile } = require('../../../utils/deleteFile')
const User = require('../../models/user')
const Restaurant = require('../../models/restaurant')
const Recipe = require('../../models/recipe')

const getRecipes = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find({ verified: true })
    return res.status(200).json(allRecipes)
  } catch (error) {
    return res.status(400).json({ error: 'Error al obtener las recetas' })
  }
}
const getRecipesNotVerified = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find({ verified: false })
    return res.status(200).json(allRecipes)
  } catch (error) {
    return res.status(400).json({ error: 'Error al obtener las recetas' })
  }
}
const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params
    const recipe = await Recipe.findById(id)
    if (!recipe) {
      return res.status(404).json({ error: 'Receta no encontrada' })
    }
    return res.status(200).json(recipe)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: 'Error al obtener la receta' })
  }
}
const postRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, ...restBody } = req.body

    const existingRecipe = await Recipe.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
    })

    if (existingRecipe) {
      return res
        .status(400)
        .json({ error: 'Ya existe una receta con ese nombre' })
    }

    const newRecipe = new Recipe({
      name,
      ingredients,
      ...restBody
    })

    if (req.file) {
      newRecipe.img = req.file.path
    }

    if (req.user) {
      if (req.user.rol === 'admin') {
        newRecipe.verified = true
      } else if (req.user.rol === 'user') {
        newRecipe.verified = false
      }
    } else if (req.restaurant) {
      if (req.restaurant.rol === 'restaurant') {
        newRecipe.verified = false
      }
    }

    const recipeSaved = await newRecipe.save()

    if (req.user && req.user._id) {
      await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { recipes_created: recipeSaved._id } },
        { new: true }
      )
    } else if (req.restaurant && req.restaurant._id) {
      await Restaurant.findByIdAndUpdate(
        req.restaurant._id,
        { $addToSet: { recipes_created: recipeSaved._id } },
        { new: true }
      )
    }

    return res.status(201).json(recipeSaved)
  } catch (error) {
    return res.status(400).json({ error: 'Error al crear la receta' })
  }
}

const updateRecipeLikes = async (req, res) => {
  const { id } = req.params
  const { action } = req.body

  try {
    const recipe = await Recipe.findById(id)

    if (!recipe) {
      return res.status(404).json({ error: 'Receta no encontrada' })
    }

    if (action === 'add') {
      recipe.likes += 1
    } else if (action === 'delete') {
      if (recipe.likes > 0) {
        recipe.likes -= 1
      } else {
        return res.status(400).json({ error: 'No se pueden quitar más likes' })
      }
    } else {
      return res.status(400).json({ error: 'Acción no válida' })
    }

    await recipe.save()

    return res.status(200).json({ message: 'Likes actualizados' })
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar los likes' })
  }
}

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params

    const recipeDeleted = await Recipe.findByIdAndDelete(id)
    if (!recipeDeleted) {
      return res.status(404).json({ error: 'Receta no encontrada' })
    }

    if (
      (req.user && req.user.rol === 'user') ||
      (req.user && req.user.rol === 'admin')
    ) {
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { recipes_created: recipeDeleted._id } },
        { new: true }
      )
    } else if (req.restaurant && req.restaurant.rol === 'restaurant') {
      await Restaurant.findByIdAndUpdate(
        req.restaurant._id,
        { $pull: { recipes_created: recipeDeleted._id } },
        { new: true }
      )
    }

    if (recipeDeleted.img) {
      deleteFile(recipeDeleted.img)
    }

    return res.status(200).json(recipeDeleted)
  } catch (error) {
    return res.status(400).json({ error: 'Error al eliminar la receta' })
  }
}
const validateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params

    const recipeValidated = await Recipe.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true, runValidators: true }
    )

    if (!recipeValidated) {
      return res.status(404).json({ error: 'Receta no encontrada' })
    }

    return res.status(200).json(recipeValidated)
  } catch (error) {
    return res.status(400).json({ error: 'Error al validar la receta' })
  }
}

module.exports = {
  getRecipes,
  getRecipesNotVerified,
  getRecipeById,
  postRecipe,
  validateRecipe,
  updateRecipeLikes,
  deleteRecipe
}
