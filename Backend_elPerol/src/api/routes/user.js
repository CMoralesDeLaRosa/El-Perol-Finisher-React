const express = require('express')
const { upload } = require('../../middlewares/file')
const {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
  addFavRecipe,
  deleteFavRecipe,
  deleteFavRestaurant,
  addFavRestaurant,
  getUserById
} = require('../controllers/users/userController')
const { isAuth, isAdmin } = require('../../middlewares/auth')

const userRouter = express.Router()

userRouter.get('/:id', isAuth, getUserById)
userRouter.get('/', isAdmin, getUsers)
userRouter.post('/register', upload('users').single('img'), register)
userRouter.post('/login', login)
userRouter.put('/:id/add-recipe/:recipeId', isAuth, addFavRecipe)
userRouter.put('/:id/add-restaurant/:restaurantId', isAuth, addFavRestaurant)
userRouter.put('/:id/delete-recipe/:recipeId', isAuth, deleteFavRecipe)
userRouter.put(
  '/:id/delete-restaurant/:restaurantId',
  isAuth,
  deleteFavRestaurant
)
userRouter.put('/update/:id', isAuth, upload('users').single('img'), updateUser)
userRouter.delete('/:id', isAuth || isAdmin, deleteUser)

module.exports = userRouter
