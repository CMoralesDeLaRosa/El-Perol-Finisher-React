import './MyProfile.css'
import { useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/HeaderComponents/Header'
import MyData from '../../components/MyProfileComponents/MyData/MyData'
import MyRecipesFav from '../../components/MyProfileComponents/MyRecipesFav/MyRecipesFav'
import MyRestaurantsFav from '../../components/MyProfileComponents/MyRestaurantsFav/MyRestaurantsFav'
import MyrecipesNonVerified from '../../components/MyProfileComponents/MyrecipesNonVerified/MyrecipesNonVerified'
import MyLikes from '../../components/MyProfileComponents/MyLikes/MyLikes'
import MyRestaurantPhrases from '../../components/MyProfileComponents/MyRestaurantPhrases/MyRestaurantPhrases'
import { useUser } from '../../context/userProvider'

const MyProfile = () => {
  const { userData } = useUser()

  if (!userData || !userData.rol) {
    return <div>No se encontró información del usuario</div>
  }

  return (
    <section id='section-my-profile-user'>
      {userData.rol === 'user' && (
        <>
          <Header />
          <MyData />
          <MyrecipesNonVerified />
          <MyRecipesFav />
          <MyRestaurantsFav />
          <Footer theme='red-dark' />
        </>
      )}
      {userData.rol === 'restaurant' && (
        <>
          <Header />
          <MyLikes />
          <MyData />
          <MyrecipesNonVerified />
          <MyRestaurantPhrases />
          <MyRecipesFav />
          <MyRestaurantsFav />
          <Footer theme='red-dark' />
        </>
      )}
    </section>
  )
}

export default MyProfile
