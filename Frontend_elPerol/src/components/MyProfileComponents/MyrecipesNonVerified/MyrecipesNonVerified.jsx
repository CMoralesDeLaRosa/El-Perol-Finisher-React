import './MyrecipesNonVerified.css'
import { RecipeNonVerified } from '../../RecipeNonVerified/RecipeNonVerified'
import { BiMessageAltX } from 'react-icons/bi'
import { useUser } from '../../../context/userProvider'

const MyrecipesNonVerified = () => {
  const { userData } = useUser()
  const nonVerifiedRecipes = userData.recipes_created.filter(
    (recipe) => recipe.verified === false
  )
  return (
    <section id='section-my-recipes-non-verified' className='flex-container'>
      <h2>Mis recetas pendientes de validar</h2>
      <p>Las recetas están siendo revisadas.</p>
      <article className='article-user-recipes-non-verified flex-container'>
        {nonVerifiedRecipes.length === 0 ? (
          <div className='no-recipes-verified-container flex-container'>
            <p>No hay recetas pendientes de validación</p>
            <BiMessageAltX className='edit-icon-alert' />
          </div>
        ) : (
          nonVerifiedRecipes.map((recipe) => (
            <RecipeNonVerified
              key={recipe._id}
              imgSrc={recipe.img}
              recipeName={recipe.name}
            />
          ))
        )}
      </article>
    </section>
  )
}

export default MyrecipesNonVerified
