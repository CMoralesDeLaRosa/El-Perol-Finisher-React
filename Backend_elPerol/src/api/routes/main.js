const express = require('express')
const userRouter = require('./user')
const recipeRouter = require('./recipe')
const restaurantRouter = require('./restaurant')

const mainRouter = express.Router()

mainRouter.use('/users', userRouter)
mainRouter.use('/restaurants', restaurantRouter)
mainRouter.use('/recipes', recipeRouter)

module.exports = mainRouter
