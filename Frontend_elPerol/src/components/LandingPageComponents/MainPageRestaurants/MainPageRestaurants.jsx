import './MainPageRestaurants.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRestaurants from '../../../hooks/useRestaurants'
import Restaurant from '../../Restaurant/Restaurant'
import Button from '../../Button/Button'

const MainPageRestaurants = () => {
  const navigate = useNavigate()
  const { restaurants, error } = useRestaurants()
  const [filteredRestaurants, setFilteredRestaurants] = useState([])

  useEffect(() => {
    setFilteredRestaurants(restaurants)
  }, [restaurants])

  const handleButtonClickRestaurants = () => {
    navigate('/restaurants')
  }

  const extendedRestaurants = Array(4).fill(filteredRestaurants).flat()

  return (
    <section id='section-main-page-restaurants'>
      {error && <p className='error-message'>{error}</p>}
      <h2>Conoce nuevos restaurantes</h2>
      <article className='article-main-page-restaurants-carousel flex-container'>
        {extendedRestaurants.length > 0 ? (
          extendedRestaurants.map((restaurant, index) => (
            <Restaurant
              key={`restaurant-${index}`}
              imgSrc={restaurant.img}
              restaurantName={restaurant.name}
              textColor='dark-text-restaurant'
              address={restaurant.address}
              schedule={restaurant.schedule}
              RestaurantLikes={restaurant.likes}
            />
          ))
        ) : (
          <p>No hay restaurantes disponibles</p>
        )}
      </article>
      <Button
        buttonTitle='Más restaurantes'
        className='button-dark-m'
        onClick={handleButtonClickRestaurants}
      />
    </section>
  )
}

export default MainPageRestaurants
