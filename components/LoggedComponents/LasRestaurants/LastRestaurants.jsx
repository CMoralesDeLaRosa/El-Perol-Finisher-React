import './LastRestaurants.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRestaurants from '../../../hooks/useRestaurants'
import Restaurant from '../../Restaurant/Restaurant'
import Button from '../../Button/Button'

const LastRestaurants = () => {
  const navigate = useNavigate()
  const { restaurants, error } = useRestaurants()
  const [lastRestaurants, setLastRestaurants] = useState([])

  useEffect(() => {
    const sortedRestaurants = [...restaurants].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
    setLastRestaurants(sortedRestaurants.slice(0, 3))
  }, [restaurants])

  const handleButtonClickRestaurants = () => {
    navigate('/restaurants')
  }

  return (
    <section id='section-last-restaurants' className='flex-container'>
      {error && <p className='error-message'>{error}</p>}
      <h2>Descubre nuevos restaurantes</h2>
      <article className='article-last-restaurants flex-container'>
        {lastRestaurants.length > 0 ? (
          lastRestaurants.map((restaurant, index) => (
            <Restaurant
              key={restaurant._id}
              id={restaurant._id}
              imgSrc={restaurant.img}
              restaurantName={restaurant.name}
              textColor='light-text-restaurant'
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

export default LastRestaurants
