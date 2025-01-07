const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const { generateSign } = require('../../../config/jwt')
const { deleteFile } = require('../../../utils/deleteFile')
const User = require('../../models/user')
const Recipe = require('../../models/recipe')
const Restaurant = require('../../models/restaurant')
const { handleFavourites } = require('../favourites/favouritescontroller')

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find()
      .populate('recipes_created')
      .populate('recipes_liked')
      .populate('restaurants_liked')

    return res.status(200).json(allUsers)
  } catch (error) {
    return res.status(400).json('Error al obtener los usuarios')
  }
}
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
      .populate('recipes_created')
      .populate('recipes_liked')
      .populate('restaurants_liked')

    if (!user) {
      return res.status(404).json({ error: 'Error al obtener el usuario' })
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({ error: 'Error al obtener el usuario' })
  }
}
const register = async (req, res, next) => {
  try {
    const newUser = new User({
      img: req.body.img,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      rol: 'user'
    })

    const userDuplicatedbyName = await User.findOne({ name: req.body.name })
    if (userDuplicatedbyName) {
      return res.status(400).json({ error: 'Este nombre de usuario ya existe' })
    }

    const userDuplicatedbyEmail = await User.findOne({ email: req.body.email })
    if (userDuplicatedbyEmail) {
      return res.status(400).json({ error: 'Este email ya existe' })
    }

    if (req.file) {
      newUser.img = req.file.path
    } else if (!newUser.img) {
      return res.status(400).json({ error: 'La imagen es obligatoria' })
    }

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json({ error: 'Error en el registro' })
  }
}
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
      .populate('recipes_created')
      .populate('recipes_liked')
      .populate('restaurants_liked')

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id)

        return res.status(200).json({ user, token })
      } else {
        return res
          .status(400)
          .json({ error: 'El usuario o la contraseña son incorrectos' })
      }
    } else {
      return res
        .status(400)
        .json({ error: 'El usuario o la contraseña son incorrectos' })
    }
  } catch (error) {
    return res.status(400).json({ error: 'Error en el login' })
  }
}
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: userIdFromAuth } = req.user

    if (id !== userIdFromAuth) {
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

      const hashedPassword = bcrypt.hashSync(updateData.password, 10)
      updateData.password = hashedPassword
    }

    if (updateData.name) {
      const userDuplicatedbyName = await User.findOne({ name: updateData.name })
      if (userDuplicatedbyName && userDuplicatedbyName._id.toString() !== id) {
        return res
          .status(400)
          .json({ error: 'Este nombre de usuario ya está en uso' })
      }
    }

    if (updateData.email) {
      const userDuplicatedbyEmail = await User.findOne({
        email: updateData.email
      })
      if (
        userDuplicatedbyEmail &&
        userDuplicatedbyEmail._id.toString() !== id
      ) {
        return res
          .status(400)
          .json({ error: 'Este correo electrónico ya está en uso' })
      }
    }

    if (req.file) {
      updateData.img = req.file.path
      const oldUser = await User.findById(id)
      if (oldUser.img) {
        deleteFile(oldUser.img)
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    return res
      .status(400)
      .json({ error: 'Error al actualizar los datos del usuario' })
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: userIdFromAuth, rol } = req.user

    if (id.toString() !== userIdFromAuth.toString() && rol !== 'admin') {
      return res
        .status(403)
        .json({ error: 'No estás autorizado para realizar esta acción' })
    }

    const userDeleted = await User.findByIdAndDelete(id)
    if (userDeleted && userDeleted.img) {
      deleteFile(userDeleted.img)
    }

    return res.status(200).json(userDeleted)
  } catch (error) {
    return res.status(400).json({ error: 'Error al eliminar el usuario' })
  }
}
const addFavRecipe = async (req, res, next) => {
  try {
    const { id } = req.params
    const { itemId } = req.body
    await handleFavourites(req, res, next, 'add')
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Error al añadir la receta a favoritos' })
  }
}
const deleteFavRecipe = async (req, res, next) => {
  try {
    const { id } = req.params
    const { itemId } = req.body
    await handleFavourites(req, res, next, 'remove')
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Error al eliminar la receta de favoritos' })
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
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFavRestaurant,
  deleteFavRestaurant,
  deleteFavRecipe,
  addFavRecipe
}
