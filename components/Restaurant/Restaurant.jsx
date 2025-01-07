import './Restaurant.css'
import { useNavigate } from 'react-router-dom'
import { IoHeartSharp } from 'react-icons/io5'

const Restaurant = ({
  imgSrc = '',
  restaurantName = '',
  textColor = '',
  address = '',
  schedule = '',
  RestaurantLikes = '',
  id
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/restaurants/${id}`)
  }
  return (
    <article className='article-restaurant-simple' onClick={handleClick}>
      <div>
        <img src={imgSrc} alt={restaurantName} />
        <div className='div-likes-restaurant flex-container'>
          <IoHeartSharp className='icon-like-restaurant' />
          <h4>{RestaurantLikes}</h4>
        </div>
      </div>
      <h3 className={`restaurant-name ${textColor}`}>{restaurantName}</h3>
      <p className='restaurant-address'>{address}</p>
      <p className='restaurant-schedule'>{schedule}</p>
    </article>
  )
}

export default Restaurant
