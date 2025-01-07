import './MainPageLogged.css'
import { useState } from 'react'
import Header from '../../components/HeaderComponents/Header'
import Footer from '../../components/Footer/Footer'
import LastRecipes from '../../components/LoggedComponents/LastRecipes/LastRecipes'
import LastRestaurants from '../../components/LoggedComponents/LasRestaurants/LastRestaurants'
import CreateRecipe from '../../components/LoggedComponents/CreateRecipe/CreateRecipe'
import BannerHello from '../../components/LoggedComponents/BannerHello/BannerHello'
import MyData from '../../components/MyProfileComponents/MyData/MyData'
import ValidateRecipesAdmin from '../../components/LoggedComponents/ValidateRecipesAdmin/ValidateRecipesAdmin'
import ValidateRestaurantsAdmin from '../../components/LoggedComponents/ValidateRestaurantsAdmin/ValidateRestaurantsAdmin'
import { useUser } from '../../context/userProvider'

const MainPageLogged = () => {
  const { userData } = useUser()

  return (
    <section id='section-logged'>
      {userData?.rol === 'user' || userData?.rol === 'restaurant' ? (
        <>
          <Header />
          <BannerHello />
          <LastRecipes />
          <CreateRecipe />
          <LastRestaurants />
          <Footer theme='red-dark' />
        </>
      ) : null}

      {userData?.rol === 'admin' && (
        <>
          <Header />
          <BannerHello />
          <MyData />
          <CreateRecipe />
          <ValidateRecipesAdmin />
          <ValidateRestaurantsAdmin />
          <Footer theme='red-dark' />
        </>
      )}
    </section>
  )
}

export default MainPageLogged
