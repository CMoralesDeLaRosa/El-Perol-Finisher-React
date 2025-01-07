const Restaurant = require('../api/models/restaurant')
const User = require('../api/models/user')
const { verifySign } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json('No estás autorizado')
    }

    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifySign(parsedToken)

    const user = await User.findById(id)
    const restaurant = await Restaurant.findById(id)

    if (user) {
      user.password = null
      req.user = user
      next()
    } else if (restaurant) {
      restaurant.password = null
      req.restaurant = restaurant
      next()
    } else {
      return res.status(401).json('No estás autorizado')
    }
  } catch (error) {
    console.error('Error en isAuth middleware:', error)
    return res.status(401).json('No estás autorizado')
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json('No estás autorizado')
    }
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifySign(parsedToken)

    const user = await User.findById(id)

    if (user.rol === 'admin') {
      user.password = null
      req.user = user
      next()
    } else {
      return res
        .status(400)
        .json('Para realizar esta acción necesitas ser administrador')
    }
  } catch (error) {
    return res.status(400).json('No estás autorizado')
  }
}

module.exports = { isAuth, isAdmin }
