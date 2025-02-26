const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const { deleteFile } = require('../../../utils/deleteFile')
const Restaurant = require('../../models/restaurant')
const { handleFavourites } = require('../favourites/favouritescontroller')

const getRestaurantsNotVerified = async (req, res, next) => {
  try {
    const allRestaurants = await Restaurant.find({ verified: false })
    return res.status(200).json(allRestaurants)
  } catch (error) {
    return res.status(400).json({ error: 'Error al obtener los restaurantes' })
  }
}
const getRestaurants = async (req, res, next) => {
  try {
    const allRestaurants = await Restaurant.find({ verified: true })
    return res.status(200).json(allRestaurants)
  } catch (error) {
    return res.status(400).json({ error: 'Error al obtener los restaurantes' })
  }
}
const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params

    const restaurant = await Restaurant.findById(id).populate('recipes_created')

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurante no encontrado' })
    }

    return res.status(200).json(restaurant)
  } catch (error) {
    return res.status(400).json({ error: 'Error al obtener el restaurante' })
  }
}

const registerRestaurant = async (req, res, next) => {
  try {
    const { img, name, email, password, address, schedule } = req.body

    const restaurantDuplicatedByName = await Restaurant.findOne({ name })
    if (restaurantDuplicatedByName) {
      return res
        .status(400)
        .json({ error: 'Este nombre de restaurante ya existe' })
    }

    const restaurantDuplicatedByEmail = await Restaurant.findOne({ email })
    if (restaurantDuplicatedByEmail) {
      return res.status(400).json({ error: 'Este email ya existe' })
    }

    let imagePath = img
    if (req.file) {
      imagePath = req.file.path
    } else if (!imagePath) {
      return res.status(400).json({ error: 'La imagen es obligatoria' })
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newRestaurant = new Restaurant({
      img: imagePath,
      name,
      email,
      password: hashedPassword,
      address,
      schedule,
      rol: 'restaurant'
    })

    const restaurantSaved = await newRestaurant.save()

    const { password: _, ...restaurantData } = restaurantSaved.toObject()

    return res.status(201).json(restaurantData)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error en el registro' })
  }
}
const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: restaurantIdFromAuth } = req.restaurant

    if (id !== restaurantIdFromAuth) {
      return res
        .status(403)
        .json({ error: 'No estás autorizado para realizar esta acción' })
    }

    const updateData = { ...req.body }

    const passwordValidation = (password) => {
      const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
      return regex.test(password)
    }

    if (updateData.password) {
      const passwordIsValid = passwordValidation(updateData.password)
      if (!passwordIsValid) {
        return res.status(400).json({
          error:
            'La contraseña debe tener al menos 8 caracteres, contener al menos una mayúscula y un número.'
        })
      }

      const hashedPassword = await bcrypt.hash(updateData.password, 10)
      updateData.password = hashedPassword
    }

    if (updateData.name) {
      const restaurantDuplicatedbyName = await Restaurant.findOne({
        name: updateData.name
      })
      if (
        restaurantDuplicatedbyName &&
        restaurantDuplicatedbyName._id.toString() !== id
      ) {
        return res
          .status(400)
          .json({ error: 'Este nombre de restaurante ya está en uso' })
      }
    }

    if (updateData.email) {
      const restaurantDuplicatedbyEmail = await Restaurant.findOne({
        email: updateData.email
      })
      if (
        restaurantDuplicatedbyEmail &&
        restaurantDuplicatedbyEmail._id.toString() !== id
      ) {
        return res
          .status(400)
          .json({ error: 'Este correo electrónico ya está en uso' })
      }
    }

    if (req.file) {
      updateData.img = req.file.path
      const oldRestaurant = await Restaurant.findById(id)
      if (oldRestaurant.img) {
        deleteFile(oldRestaurant.img)
      }
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true
      }
    )

    if (!updatedRestaurant) {
      return res.status(404).json({ error: 'Restaurante no encontrado' })
    }

    return res.status(200).json(updatedRestaurant)
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Error al actualizar los datos del restaurante' })
  }
}
const updateRestaurantLikes = async (req, res) => {
  const { id } = req.params
  const { action } = req.body

  try {
    const restaurant = await Restaurant.findById(id)

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurante no encontrado' })
    }

    if (action === 'add') {
      restaurant.likes += 1
    } else if (action === 'delete') {
      restaurant.likes -= 1
    } else {
      return res.status(400).json({ error: 'Error al actualizar los likes' })
    }

    await restaurant.save()

    return res.status(200).json({ message: 'Likes actualizados' })
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar los likes' })
  }
}

const updatePhrases = async (req, res) => {
  try {
    const { id } = req.params
    const { id: restaurantIdFromAuth } = req.restaurant
    const { phrase, index } = req.body

    if (id !== restaurantIdFromAuth) {
      return res
        .status(403)
        .json({ error: 'No estás autorizado para realizar esta acción' })
    }

    if (typeof phrase !== 'string' || index < 0 || index > 2) {
      return res
        .status(400)
        .json({ error: 'Frase inválida o índice incorrecto' })
    }

    const restaurant = await Restaurant.findById(id)

    if (!restaurant) {
      return res.status(400).json({ error: 'Restaurante no encontrado' })
    }

    restaurant.phrases[index] = phrase
    await restaurant.save()

    res.json({
      message: 'Frase actualizada correctamente',
      phrases: restaurant.phrases
    })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: 'Error al modificar la frase' })
  }
}
const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params
    const { restaurant, user } = req
    if (!restaurant && !user) {
      return res
        .status(403)
        .json({ error: 'No estás autorizado para realizar esta acción' })
    }
    if (restaurant) {
      const restaurantIdFromAuth = restaurant._id.toString()
      if (id.toString() !== restaurantIdFromAuth) {
        return res
          .status(403)
          .json({ error: 'No estás autorizado para eliminar este restaurante' })
      }
    }
    if (user) {
      const rol = user.rol
      if (rol !== 'admin') {
        return res
          .status(403)
          .json({ error: 'No estás autorizado para realizar esta acción' })
      }
    }
    const restaurantToDelete = await Restaurant.findById(id)
    if (!restaurantToDelete) {
      return res.status(404).json({ error: 'Restaurante no encontrado' })
    }
    const restaurantDeleted = await Restaurant.findByIdAndDelete(id)
    if (restaurantDeleted && restaurantDeleted.img) {
      deleteFile(restaurantDeleted.img)
    }

    return res.status(200).json(restaurantDeleted)
  } catch (error) {
    return res.status(400).json({ error: 'Error al eliminar el restaurante' })
  }
}
const validateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params
    const restaurantValidated = await Restaurant.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true, runValidators: true }
    )

    if (!restaurantValidated) {
      return res.status(404).json({ error: 'Restaurante no encontrado' })
    }

    return res.status(200).json(restaurantValidated)
  } catch (error) {
    return res.status(400).json({ error: 'Error al validar el restaurante' })
  }
}
const addFavRecipe = async (req, res, next) => {
  try {
    const { id } = req.params
    const { itemId } = req.body
    await handleFavourites(req, res, next, 'add')
  } catch (error) {
    next(error)
  }
}
const deleteFavRecipe = async (req, res, next) => {
  try {
    const { id } = req.params
    const { itemId } = req.body
    await handleFavourites(req, res, next, 'remove')
  } catch (error) {
    next(error)
  }
}
const addFavRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params
    const { itemId } = req.body
    await handleFavourites(req, res, next, 'add')
  } catch (error) {
    next(error)
  }
}
const deleteFavRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params
    const { itemId } = req.body
    await handleFavourites(req, res, next, 'remove')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getRestaurants,
  getRestaurantsNotVerified,
  getRestaurantById,
  registerRestaurant,
  updateRestaurant,
  updateRestaurantLikes,
  deleteRestaurant,
  validateRestaurant,
  addFavRecipe,
  deleteFavRecipe,
  addFavRestaurant,
  deleteFavRestaurant,
  updatePhrases
}
