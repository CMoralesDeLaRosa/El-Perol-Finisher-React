import './ValidateRecipesAdmin.css'
import { useEffect, useState } from 'react'
import { useUser } from '../../../context/userProvider'
import { RecipeNonVerifiedAdmin } from '../../RecipeNonVerified/RecipeNonVerified'
import { handleNonVerifiedRecipes } from '../../../utils/handleNonVerifiedRecipes'
import { handleValidateRecipe } from '../../../utils/handleValidateRecipe'
import { handleDeleteRecipe } from '../../../utils/handleDeleteRecipe'
import { ConfirmationPromptRecipe } from '../../ConfirmationPrompt/ConfirmationPrompt'
import { BiMessageAltX } from 'react-icons/bi'
import SpinnerLoading from '../../SpinnerLoading/SpinnerLoading'
import Button from '../../Button/Button'

const ValidateRecipesAdmin = () => {
  const { token, userData } = useUser()
  const [nonVerifiedRecipes, setNonVerifiedRecipes] = useState([])
  const [recipeToDelete, setRecipeToDelete] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirmationPromptVisibility, setConfirmationPromptVisibility] =
    useState({})

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true)
      try {
        const { recipes, error } = await handleNonVerifiedRecipes(
          token,
          userData,
          setError
        )
        setNonVerifiedRecipes(recipes)
        setError(error)
      } catch (err) {
        setError('Error inesperado al cargar recetas')
      } finally {
        setLoading(false)
      }
    }

    loadRecipes()
  }, [])

  const handleConfirmationPromptData = (recipeId) => {
    setRecipeToDelete(recipeId)
    setConfirmationPromptVisibility((prevState) => ({
      ...prevState,
      [recipeId]: true
    }))
  }

  const handleCloseConfirmationPrompt = (recipeId) => {
    setConfirmationPromptVisibility((prevState) => ({
      ...prevState,
      [recipeId]: false
    }))
  }

  const handleRecipeDelete = async () => {
    setLoading(true)
    try {
      await handleDeleteRecipe(recipeToDelete, token, userData, setError)
      setNonVerifiedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeToDelete)
      )
    } catch (error) {
      setError(result.error || 'Error al eliminar la receta la receta')
    } finally {
      setLoading(false)
      setRecipeToDelete(null)
    }
  }

  const validateRecipe = async (recipeId) => {
    setLoading(true)
    try {
      const result = await handleValidateRecipe(
        recipeId,
        token,
        userData,
        setError
      )
      if (result.success) {
        setNonVerifiedRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== recipeId)
        )
      } else {
        setError(result.error || 'Error al validar la receta')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id='section-validate-recipes-admin' className='flex-container'>
      {error && <p className='error-message'>{error}</p>}
      <h2>Recetas pendientes de validar</h2>
      <article className='article-admin-recipes-non-verified'>
        {loading && <SpinnerLoading />}
        {error && (
          <div className='no-recipes-non-verified-container flex-container'>
            <p>Error al cargar recetas: {error}</p>
            <BiMessageAltX className='edit-icon-alert-validate-admin' />
          </div>
        )}
        {!error && nonVerifiedRecipes.length === 0 && (
          <div className='no-recipes-non-verified-container flex-container'>
            <p>No hay recetas pendientes de validación</p>
            <BiMessageAltX className='edit-icon-alert-validate-admin' />
          </div>
        )}
        {!error &&
          nonVerifiedRecipes.length > 0 &&
          nonVerifiedRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className='recipes-non-verified-admin-container flex-container'
            >
              <RecipeNonVerifiedAdmin
                recipeId={recipe._id}
                imgSrc={recipe.img}
                recipeName={recipe.name}
                region={recipe.region}
                difficulty={recipe.difficulty}
                time={recipe.time}
                portions={recipe.portions}
                ingredients={recipe.ingredients}
                elaboration={recipe.elaboration}
              />

              <div className='div-buttons-recipes-non-verified-admin flex-container'>
                <Button
                  buttonTitle='Validar'
                  className='button-light-xs'
                  onClick={() => validateRecipe(recipe._id)}
                />
                <Button
                  buttonTitle='Eliminar'
                  type='button'
                  onClick={() => handleConfirmationPromptData(recipe._id)}
                  className='button-light-xs'
                />
              </div>
              {confirmationPromptVisibility[recipe._id] && (
                <ConfirmationPromptRecipe
                  onConfirm={handleRecipeDelete}
                  onCancel={() => handleCloseConfirmationPrompt(recipe._id)}
                />
              )}
            </div>
          ))}
      </article>
    </section>
  )
}

export default ValidateRecipesAdmin
