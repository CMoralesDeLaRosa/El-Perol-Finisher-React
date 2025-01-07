import './MyRestaurantsFav.css'
import RestaurantFav from '../../RestaurantFav/RestaurantFav'
import { BiMessageAltX } from 'react-icons/bi'
import { useUser } from '../../../context/userProvider'

const MyRestaurantsFav = () => {
  const { userData } = useUser()
  const restaurantsFav = userData.restaurants_liked

  return (
    <section id='section-my-restaurants-fav'>
      <article className='article-my-restaurants-fav flex-container'>
        <h2>Mis restaurantes favoritos</h2>
        {restaurantsFav.length === 0 ? (
          <div className='no-restaurants-liked-container flex-container'>
            <p>No has añadido restaurantes favoritos</p>
            <BiMessageAltX className='edit-icon-alert-restaurants-fav' />
          </div>
        ) : (
          <div className='restaurants-liked-container '>
            {restaurantsFav.map((restaurant) => (
              <RestaurantFav
                key={restaurant._id}
                id={restaurant._id}
                imgSrc={restaurant.img}
                RestaurantName={restaurant.name}
              />
            ))}
          </div>
        )}
      </article>
    </section>
  )
}

export default MyRestaurantsFav
