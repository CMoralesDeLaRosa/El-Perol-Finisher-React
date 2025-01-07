import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Recipes from './pages/Recipes/Recipes'
import Restaurants from './pages/Restaurants/Restaurants'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import RecipeDetails from './pages/RecipeDetails/RecipeDetails'
import RestaurantDetails from './pages/RestaurantDetails/RestaurantDetails'
import MyProfileUser from './pages/MyProfile/MyProfile'
import MainPageLogged from './pages/MainPageLogged/MainPageLogged'
import UsersAdmin from './pages/UsersAdmin/UsersAdmin'
import { UserProvider } from './context/userProvider'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const token = localStorage.getItem('token')

    if (userData && token) {
      navigate('/logged')
    }
  }, [])

  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='*' element={<LandingPage />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/restaurants' element={<Restaurants />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logged' element={<MainPageLogged />} />
        <Route path='/recipes/:id' element={<RecipeDetails />}></Route>
        <Route path='/restaurants/:id' element={<RestaurantDetails />}></Route>
        <Route path='/logged/my-profile' element={<MyProfileUser />}></Route>
        <Route path='/admin/users' element={<UsersAdmin />}></Route>
      </Routes>
    </UserProvider>
  )
}

export default App
