import './Restaurants.css'
import React, { useEffect, useState, useRef } from 'react'
import { useUser } from '../../context/userProvider'
import Header from '../../components/HeaderComponents/Header'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import Restaurant from '../../components/Restaurant/Restaurant'
import useRestaurants from '../../hooks/useRestaurants'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
import { handleDeleteAccountAdminRestaurant } from '../../utils/handleDeleteAccountAdmin'
import { ConfirmationPromptRestaurant } from '../../components/ConfirmationPrompt/ConfirmationPrompt'

const Restaurants = () => {
  const { restaurants, loading: restaurantsLoading } = useRestaurants() // Asegúrate de usar restaurantsLoading
  const searchRef = useRef(null)
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [isConfirmationPromptVisible, setIsConfirmationPromptVisible] =
    useState(false)
  const [restaurantToDelete, setRestaurantToDelete] = useState(null)
  const { userData, token } = useUser()
  const { error, setError } = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    const searchTerm = searchRef.current.value.toLowerCase()
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm)
    )
    setFilteredRestaurants(filtered)
  }

  useEffect(() => {
    setFilteredRestaurants(restaurants)
  }, [restaurants])

  const handleConfirmationPromptData = (id) => {
    setRestaurantToDelete(id)
    setIsConfirmationPromptVisible(true)
  }

  const handleCloseConfirmationPrompt = () => {
    setIsConfirmationPromptVisible(false)
  }

  const handleRestaurantDelete = async () => {
    setLoading(true)
    try {
      const response = await handleDeleteAccountAdminRestaurant(
        restaurantToDelete,
        token,
        userData,
        setError
      )
      setIsConfirmationPromptVisible(false)
      setFilteredRestaurants((prevRestaurants) =>
        prevRestaurants.filter(
          (restaurant) => restaurant._id !== restaurantToDelete
        )
      )
      setRestaurantToDelete(null)
    } catch (error) {
      setError('Error inesperado al intentar eliminar el restaurante.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id='section-restaurants'>
      <Header />
      {error && <p className='error-message'>{error}</p>}
      <article className='article-restaurants-search'>
        <h2>Restaurantes</h2>
        <input
          type='text'
          placeholder='Buscar restaurante...'
          ref={searchRef}
          onChange={handleSearch}
        />
      </article>

      <article className='article-restaurants-general flex-container'>
        {restaurantsLoading ? (
          <SpinnerLoading />
        ) : filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div key={restaurant._id} className='restaurant-container'>
              <Restaurant
                id={restaurant._id}
                imgSrc={restaurant.img}
                restaurantName={restaurant.name}
                textColor='light-text-restaurant'
                address={restaurant.address}
                schedule={restaurant.schedule}
                RestaurantLikes={restaurant.likes}
              />
              {userData?.rol === 'admin' && (
                <Button
                  buttonTitle='x'
                  type='button'
                  onClick={() => handleConfirmationPromptData(restaurant._id)}
                  className='button-remove-restaurant'
                />
              )}
            </div>
          ))
        ) : (
          <p className='text-no-restaurants'>No hay restaurantes disponibles</p>
        )}
      </article>

      {isConfirmationPromptVisible && (
        <ConfirmationPromptRestaurant
          onConfirm={handleRestaurantDelete}
          onCancel={handleCloseConfirmationPrompt}
        />
      )}
      <Footer theme='red-dark' />
    </section>
  )
}

export default Restaurants
