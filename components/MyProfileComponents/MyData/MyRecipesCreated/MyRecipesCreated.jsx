import './MyRecipesCreated.css'
import { useState } from 'react'
import RecipeCreated from '../../../RecipeCreated/RecipeCreated'
import { handleDeleteRecipe } from '../../../../utils/handleDeleteRecipe'
import { ConfirmationPromptRecipe } from '../../../ConfirmationPrompt/ConfirmationPrompt'
import Button from '../../../Button/Button'
import { BiMessageAltX } from 'react-icons/bi'
import SpinnerLoading from '../../../SpinnerLoading/SpinnerLoading'
import { useUser } from '../../../../context/userProvider'

const MyRecipesCreated = () => {
  const { userData, updateUserData, token } = useUser()
  const verifiedRecipes = userData.recipes_created.filter(
    (recipe) => recipe.verified === true
  )
  const [recipes, setRecipes] = useState(verifiedRecipes)

  const [recipeToDelete, setRecipeToDelete] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isConfirmationPromptVisible, setIsConfirmationPromptVisible] =
    useState(false)

  const handleConfirmationPromptData = (recipeId) => {
    setRecipeToDelete(recipeId)
    setIsConfirmationPromptVisible(true)
  }
  const handleCloseConfirmationPrompt = () => {
    setIsConfirmationPromptVisible(false)
  }

  const handleRecipeDelete = async () => {
    setLoading(true)
    try {
      const result = await handleDeleteRecipe(
        recipeToDelete,
        token,
        userData,
        setError
      )

      if (result.success) {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== recipeToDelete)
        )

        const updatedUserData = {
          ...userData,
          recipes_created: userData.recipes_created.filter(
            (recipe) => recipe._id !== recipeToDelete
          )
        }

        updateUserData(updatedUserData)
        localStorage.setItem('userData', JSON.stringify(updatedUserData))

        setIsConfirmationPromptVisible(false)
      } else {
        setError(result.error || 'Error inesperado al eliminar la receta')
      }
    } catch (err) {
      setError('Error inesperado al cargar las recetas')
    } finally {
      setLoading(false)
      setRecipeToDelete(null)
    }
  }

  return (
    <article className='article-my-recipes-created'>
      {error && <p className='error-message'>{error}</p>}
      {loading && <SpinnerLoading />}
      <h2>Mis recetas</h2>
      <div
        className={`div-user-recipes-created flex-container ${
          userData.rol === 'user'
            ? 'user'
            : userData.rol === 'restaurant'
            ? 'restaurant'
            : userData.rol === 'admin'
            ? 'admin'
            : ''
        }`}
      >
        {recipes.length === 0 ? (
          <div className='no-recipes-container flex-container'>
            <p>No hay recetas disponibles</p>
            <BiMessageAltX className='edit-icon-alert' />
          </div>
        ) : (
          <div className='recipes-created-container'>
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className='recipe-item-container flex-container'
              >
                <RecipeCreated
                  id={recipe._id}
                  imgSrc={recipe.img}
                  RecipeName={recipe.name}
                />
                <Button
                  buttonTitle='x'
                  type='button'
                  onClick={() => handleConfirmationPromptData(recipe._id)}
                  className='button-remove-recipe'
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {isConfirmationPromptVisible && (
        <ConfirmationPromptRecipe
          onConfirm={handleRecipeDelete}
          onCancel={handleCloseConfirmationPrompt}
        />
      )}
    </article>
  )
}

export default MyRecipesCreated
