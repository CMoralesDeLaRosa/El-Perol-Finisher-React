import './RestaurantDetails.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useRestaurants from '../../hooks/useRestaurants'
import { useUser } from '../../context/userProvider'
import Header from '../../components/HeaderComponents/Header'
import Footer from '../../components/Footer/Footer'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import { BiMessageAltX } from 'react-icons/bi'
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import { updateLikesInDatabase, updateUserLikes } from '../../utils/handleLikes'
import RecipeCreated from '../../components/RecipeCreated/RecipeCreated'

const RestaurantDetails = () => {
  const { userData, updateUserData, token } = useUser()
  const { id: restaurantId } = useParams()
  const {
    restaurants: restaurant,
    loading,
    error: restaurantError
  } = useRestaurants(restaurantId)

  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (restaurant?.recipes_created) {
      const verified = restaurant.recipes_created.filter(
        (recipe) => recipe.verified
      )
      setRecipes(verified)
    }
  }, [restaurant])

  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState('')
  const [phrases, setPhrases] = useState({
    phrase1: '',
    phrase2: '',
    phrase3: ''
  })

  useEffect(() => {
    if (!loading && userData && Array.isArray(userData.restaurants_liked)) {
      const validRestaurants = userData.restaurants_liked.filter(
        (restaurant) => restaurant._id
      )
      const isLiked = validRestaurants.some(
        (restaurant) => restaurant._id === restaurantId
      )
      setIsLiked(isLiked)
    }
  }, [userData, restaurantId, loading])

  useEffect(() => {
    if (!loading && restaurant && Array.isArray(restaurant.phrases)) {
      setPhrases({
        phrase1: restaurant.phrases[0] || 'No has añadido ningún anuncio',
        phrase2: restaurant.phrases[1] || 'No has añadido ningún anuncio',
        phrase3: restaurant.phrases[2] || 'No has añadido ningún anuncio'
      })
    }
  }, [restaurant])

  const handleHeartClick = async () => {
    if (!userData) {
      setError('Debes iniciar sesión para añadir a favoritos.')
      return
    }

    const action = isLiked ? 'delete' : 'add'

    try {
      const response = await updateLikesInDatabase(
        restaurantId,
        action,
        token,
        setError,
        'restaurant'
      )

      if (response.success) {
        setIsLiked(!isLiked)
        restaurant.likes = isLiked ? restaurant.likes - 1 : restaurant.likes + 1
      } else {
        setError(
          response.error ||
            'Error al actualizar los favoritos. Inténtalo de nuevo.'
        )
        return
      }
    } catch (error) {
      setError('Error al actualizar los favoritos. Inténtalo de nuevo.')
      return
    }

    try {
      const response = await updateUserLikes(
        userData,
        restaurant,
        restaurantId,
        action,
        'restaurant',
        token,
        setError,
        updateUserData
      )

      if (response.success) {
      } else {
        setError(
          response.error ||
            'Error al actualizar los favoritos del usuario. Inténtalo de nuevo.'
        )
      }
    } catch (error) {
      setError(
        'Error al actualizar los favoritos del usuario. Inténtalo de nuevo.'
      )
    }
  }

  if (loading) {
    return <SpinnerLoading />
  }

  if (!restaurant) {
    return (
      <p className='error-message'>
        {error || 'No se encontró el restaurante.'}
      </p>
    )
  }

  return (
    <section id='section-restaurant-details'>
      <Header />
      {error && <p className='error-message'>{error}</p>}
      <article className='flex-container article-restaurant-details'>
        <article className='article-restaurant-img'>
          <img src={restaurant.img} alt='Interior del restaurante' />
          <div
            className='div-likes-restaurant-details'
            onClick={handleHeartClick}
          >
            {isLiked ? (
              <IoHeartSharp className='icon-like-restaurant-details-full' />
            ) : (
              <IoHeartOutline className='icon-like-restaurant-details-empty' />
            )}
            <h4>{restaurant.likes}</h4>
          </div>
        </article>
        <article className='article-restaurant-main-details'>
          <div className='div-restaurant-details flex-container'>
            <h2>{restaurant.name}</h2>
            <p className='p-address-restaurant'>{restaurant.address}</p>
            <p className='p-schedule-restaurant'>{restaurant.schedule}</p>
          </div>
          <div className='div-restaurant-recipes flex-container'>
            <h3>Recetas</h3>
            <div className='recipes-created-container-restaurant'>
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <div
                    key={recipe._id}
                    className='recipe-item-container-restaurant flex-container'
                  >
                    <RecipeCreated
                      id={recipe._id}
                      imgSrc={recipe.img}
                      RecipeName={recipe.name}
                    />
                  </div>
                ))
              ) : (
                <div className='no-recipes-created-container flex-container'>
                  <p>No hay recetas disponibles en este momento.</p>
                  <BiMessageAltX className='icon-no-recipes-restaurant' />
                </div>
              )}
            </div>
          </div>
        </article>
      </article>

      {Object.values(phrases).some(
        (phrase) => phrase !== 'No has añadido ningún anuncio'
      ) && (
        <article className='article-restaurant-phrases flex-container'>
          {phrases.phrase1 &&
            phrases.phrase1 !== 'No has añadido ningún anuncio' && (
              <div className='div-restaurant-phrase flex-container'>
                <p>{phrases.phrase1}</p>
              </div>
            )}
          {phrases.phrase2 &&
            phrases.phrase2 !== 'No has añadido ningún anuncio' && (
              <div className='div-restaurant-phrase flex-container'>
                <p>{phrases.phrase2}</p>
              </div>
            )}
          {phrases.phrase3 &&
            phrases.phrase3 !== 'No has añadido ningún anuncio' && (
              <div className='div-restaurant-phrase flex-container'>
                <p>{phrases.phrase3}</p>
              </div>
            )}
        </article>
      )}
      <Footer theme='footer-red-light' />
    </section>
  )
}

export default RestaurantDetails
