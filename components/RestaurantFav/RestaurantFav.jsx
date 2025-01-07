import './RestaurantFav.css'
import { useNavigate } from 'react-router-dom'

const RestaurantFav = ({
  imgSrc = '',
  RestaurantName = '',
  id,
  className = ''
}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/restaurants/${id}`)
  }

  return (
    <article
      className={`article-restaurant-simple-fav ${className}`}
      onClick={handleClick}
    >
      <img src={imgSrc} alt={RestaurantName} />
      <h3>{RestaurantName}</h3>
    </article>
  )
}

export default RestaurantFav
