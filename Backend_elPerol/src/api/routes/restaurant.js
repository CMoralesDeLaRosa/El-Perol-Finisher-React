const express = require('express')
const { upload } = require('../../middlewares/file')
const {
  getRestaurants,
  registerRestaurant,
  loginRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantsNotVerified,
  validateRestaurant,
  getRestaurantById,
  updateRestaurantLikes,
  addFavRecipe,
  addFavRestaurant,
  deleteFavRecipe,
  deleteFavRestaurant,
  updatePhrases
} = require('../controllers/restaurants/restaurantController')
const { isAuth, isAdmin } = require('../../middlewares/auth')

const restaurantRouter = express.Router()

restaurantRouter.get('/not-verified', getRestaurantsNotVerified)
restaurantRouter.get('/:id', getRestaurantById)
restaurantRouter.get('/', getRestaurants)
restaurantRouter.put('/validate/:id', isAdmin, validateRestaurant)
restaurantRouter.put('/:id/like', isAuth, updateRestaurantLikes)
restaurantRouter.put('/:id/phrases', isAuth, updatePhrases)
restaurantRouter.post(
  '/register',
  upload('restaurants').single('img'),
  registerRestaurant
)
restaurantRouter.post('/login', loginRestaurant)
restaurantRouter.put(
  '/update/:id',
  isAuth,
  upload('restaurants').single('img'),
  updateRestaurant
)
restaurantRouter.delete('/:id', isAuth || isAdmin, deleteRestaurant)

restaurantRouter.put('/:id/add-recipe/:recipeId', isAuth, addFavRecipe)
restaurantRouter.put(
  '/:id/add-restaurant/:restaurantId',
  isAuth,
  addFavRestaurant
)
restaurantRouter.put('/:id/delete-recipe/:recipeId', isAuth, deleteFavRecipe)
restaurantRouter.put(
  '/:id/delete-restaurant/:restaurantId',
  isAuth,
  deleteFavRestaurant
)

module.exports = restaurantRouter
