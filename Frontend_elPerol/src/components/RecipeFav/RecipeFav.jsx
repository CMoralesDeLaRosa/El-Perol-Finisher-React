import './RecipeFav.css'
import { useNavigate } from 'react-router-dom'

const RecipeFav = ({ imgSrc = '', RecipeName = '', id }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/recipes/${id}`)
  }
  return (
    <article className='article-recipe-simple-fav' onClick={handleClick}>
      <img src={imgSrc} alt={RecipeName} />
      <h3>{RecipeName}</h3>
    </article>
  )
}

export default RecipeFav
