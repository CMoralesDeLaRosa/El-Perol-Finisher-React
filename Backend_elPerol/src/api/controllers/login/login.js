const bcrypt = require('bcrypt')
const { generateSign } = require('../../../config/jwt')
const Restaurant = require('../../models/restaurant')
const User = require('../../models/user')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    let user = null

    user = await User.findOne({ email })
      .populate('recipes_created')
      .populate('recipes_liked')
      .populate('restaurants_liked')

    if (!user) {
      user = await Restaurant.findOne({ email })
        .populate('recipes_created')
        .populate('recipes_liked')
        .populate('restaurants_liked')

      if (user && !user.verified) {
        return res.status(400).json({ error: 'La cuenta no ha sido validada' })
      }
    }

    if (!user) {
      return res
        .status(400)
        .json({ error: 'El usuario o la contraseña son incorrectos' })
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(400)
        .json({ error: 'El usuario o la contraseña son incorrectos' })
    }

    const token = generateSign(user._id)

    return res.status(200).json({ user, token })
  } catch (error) {
    return res.status(400).json({ error: 'Error en el login' })
  }
}

module.exports = { login }
