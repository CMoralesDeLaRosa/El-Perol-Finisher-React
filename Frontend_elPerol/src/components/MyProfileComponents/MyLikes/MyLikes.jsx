import './MyLikes.css'
import RestaurantFav from '../../RestaurantFav/RestaurantFav'
import { IoHeartSharp } from 'react-icons/io5'
import { useUser } from '../../../context/userProvider'

const MyLikes = () => {
  const { userData } = useUser()
  const myLikes = userData.likes
  return (
    <section id='section-mylikes'>
      <article className='article-mylikes-counter flex-container'>
        <p>
          Tienes <span>{myLikes}</span> {myLikes === 1 ? 'like' : 'likes'} en tu
          perfil
        </p>
        <IoHeartSharp className='icon-like-recipe-details-full' />
      </article>
      <article className='article-mylikes-profile flex-container'>
        <RestaurantFav
          key={userData._id}
          id={userData._id}
          imgSrc={userData.img}
          RestaurantName={userData.name}
          className='myOwnRestaurant'
        />
      </article>
    </section>
  )
}

export default MyLikes
