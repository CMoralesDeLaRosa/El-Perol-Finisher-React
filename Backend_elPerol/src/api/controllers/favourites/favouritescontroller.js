const mongoose = require('mongoose')
const User = require('../../models/user')
const Restaurant = require('../../models/restaurant')

const handleFavourites = async (req, res, next, action) => {
  try {
    const { recipeId, restaurantId } = req.params
    const itemId = recipeId || restaurantId
    const isUser = !!req.user
    const isRestaurant = !!req.restaurant

    if (!isUser && !isRestaurant) {
      return res.status(401).json({ error: 'Usuario no autorizado' })
    }

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: 'Error' })
    }

    const itemObjectId = new mongoose.Types.ObjectId(itemId)

    const model = isUser ? User : Restaurant
    const favoriteField = isUser ? 'recipes_liked' : 'restaurants_liked'
    const userId = isUser ? req.user._id : req.restaurant._id

    const updateAction =
      action === 'add'
        ? { $addToSet: { [favoriteField]: itemObjectId } }
        : { $pull: { [favoriteField]: itemObjectId } }

    const updatedUserOrRestaurant = await model.findByIdAndUpdate(
      userId,
      updateAction,
      { new: true, runValidators: true }
    )

    if (!updatedUserOrRestaurant) {
      return res
        .status(404)
        .json({ error: 'Usuario o restaurante no encontrado' })
    }

    return res.status(200).json(updatedUserOrRestaurant)
  } catch (error) {
    return res.status(500).json({ error: 'Error' })
  }
}

module.exports = { handleFavourites }
