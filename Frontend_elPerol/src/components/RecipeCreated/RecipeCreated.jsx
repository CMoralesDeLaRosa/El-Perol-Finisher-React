import './RecipeCreated.css'
import { useNavigate } from 'react-router-dom'

const RecipeCreated = ({ imgSrc = '', RecipeName = '', id }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/recipes/${id}`)
  }
  return (
    <article className='article-recipe-simple-created' onClick={handleClick}>
      <img src={imgSrc} alt={RecipeName} />
      <h3>{RecipeName}</h3>
    </article>
  )
}

export default RecipeCreated
