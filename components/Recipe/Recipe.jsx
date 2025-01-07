import './Recipe.css'
import { useNavigate } from 'react-router-dom'
import { IoHeartSharp } from 'react-icons/io5'

const Recipe = ({
  imgSrc = '',
  RecipeName = '',
  TextColor = '',
  RecipeLikes = '',
  id
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/recipes/${id}`)
  }

  return (
    <article className='article-recipe-simple' onClick={handleClick}>
      <div>
        <img src={imgSrc} alt={RecipeName} />
        <div className='div-likes-recipe flex-container'>
          <IoHeartSharp className='icon-like-recipe' />
          <h4>{RecipeLikes}</h4>
        </div>
      </div>
      <h3 className={`recipe-name ${TextColor}`}>{RecipeName}</h3>
    </article>
  )
}

export default Recipe
