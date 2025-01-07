import './RestaurantNonVerified.css'

const RestaurantNonVerified = ({
  imgSrc = '',
  restaurantName = '',
  email = '',
  address = '',
  schedule = ''
}) => {
  return (
    <article className='article-restaurant-non-verified-admin'>
      <h3>{restaurantName}</h3>
      <div className='div-restaurant-non-verified-admin-img'>
        <img src={imgSrc} alt={restaurantName} />
      </div>
      <div className='div-restaurant-non-verified-admin-basics flex-container'>
        <h5>{email}</h5>
        <h5>{address}</h5>
        <h5>{schedule}</h5>
      </div>
    </article>
  )
}

export default RestaurantNonVerified
