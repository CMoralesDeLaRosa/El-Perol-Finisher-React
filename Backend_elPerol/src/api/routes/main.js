const express = require('express')
const userRouter = require('./user')
const recipeRouter = require('./recipe')
const restaurantRouter = require('./restaurant')
const { login } = require('../controllers/login/login')

const mainRouter = express.Router()

mainRouter.use('/users', userRouter)
mainRouter.use('/restaurants', restaurantRouter)
mainRouter.use('/recipes', recipeRouter)
mainRouter.post('/login', login)

module.exports = mainRouter
