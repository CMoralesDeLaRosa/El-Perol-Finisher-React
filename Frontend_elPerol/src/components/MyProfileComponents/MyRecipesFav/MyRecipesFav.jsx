import './MyRecipesFav.css'
import RecipeFav from '../../RecipeFav/RecipeFav'
import { BiMessageAltX } from 'react-icons/bi'
import { useUser } from '../../../context/userProvider'

const MyRecipesFav = () => {
  const { userData } = useUser()
  const recipesFav = userData?.recipes_liked || []

  return (
    <section id='section-my-recipes-fav' className='flex-container'>
      <article className='article-my-recipes-fav flex-container'>
        <h2>Mis recetas favoritas</h2>
        {recipesFav.length === 0 ? (
          <div className='no-recipes-liked-container flex-container'>
            <p>No has añadido recetas favoritas</p>
            <BiMessageAltX className='edit-icon-alert-recipes-fav' />
          </div>
        ) : (
          <div className='recipes-liked-container'>
            {recipesFav.map((recipe) => (
              <RecipeFav
                key={recipe._id}
                id={recipe._id}
                imgSrc={recipe.img}
                RecipeName={recipe.name}
              />
            ))}
          </div>
        )}
      </article>
    </section>
  )
}

export default MyRecipesFav
