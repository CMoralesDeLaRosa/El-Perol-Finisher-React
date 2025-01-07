import './Recipes.css'
import React, { useEffect, useRef, useState } from 'react'
import { useUser } from '../../context/userProvider'
import Header from '../../components/HeaderComponents/Header'
import Recipe from '../../components/Recipe/Recipe'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import Button from '../../components/Button/Button'
import Footer from '../../components/Footer/Footer'
import { handleDeleteAccountAdminRecipe } from '../../utils/handleDeleteAccountAdmin'
import { ConfirmationPromptRecipe } from '../../components/ConfirmationPrompt/ConfirmationPrompt'
import useRecipes from '../../hooks/useRecipes'

const Recipes = () => {
  const { recipes, loading: recipesLoading } = useRecipes()
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const searchRef = useRef(null)
  const [isConfirmationPromptVisible, setIsConfirmationPromptVisible] =
    useState(false)
  const [recipeToDelete, setRecipeToDelete] = useState(null)
  const { userData, token, updateUserData } = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setFilteredRecipes(recipes)
  }, [recipes])

  const handleSearch = () => {
    const searchTerm = searchRef.current.value.toLowerCase()
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm)
    )
    setFilteredRecipes(filtered)
  }

  const handleConfirmationPromptData = (id) => {
    setRecipeToDelete(id)
    setIsConfirmationPromptVisible(true)
  }

  const handleCloseConfirmationPrompt = () => {
    setIsConfirmationPromptVisible(false)
  }

  const handleRecipeDelete = async () => {
    setLoading(true)

    try {
      loading(true)
      await handleDeleteAccountAdminRecipe(
        recipeToDelete,
        token,
        userData,
        updateUserData,
        setError
      )
      setFilteredRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeToDelete)
      )
      setRecipeToDelete(null)
      setIsConfirmationPromptVisible(false)
      loading(false)
    } catch (error) {
      setError('Error inesperado al intentar eliminar la receta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id='section-recipes'>
      <Header />
      {error && <p className='error-message'>{error}</p>}
      <article className='article-recipes-search'>
        <h2>Recetas</h2>
        <input
          type='text'
          placeholder='Buscar receta...'
          ref={searchRef}
          onChange={handleSearch}
        />
      </article>

      <article className='article-recipes-general flex-container'>
        {recipesLoading ? (
          <SpinnerLoading />
        ) : filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className='recipe-container'>
              <Recipe
                key={recipe._id}
                id={recipe._id}
                imgSrc={recipe.img}
                RecipeName={recipe.name}
                RecipeLikes={recipe.likes}
                TextColor='light-text-recipe'
              />
              {userData?.rol === 'admin' && (
                <Button
                  buttonTitle='x'
                  type='button'
                  onClick={() => handleConfirmationPromptData(recipe._id)}
                  className='button-remove-recipe-admin'
                />
              )}
            </div>
          ))
        ) : (
          <p className='text-no-recipes'>No hay recetas disponibles</p>
        )}
      </article>

      {isConfirmationPromptVisible && (
        <ConfirmationPromptRecipe
          onConfirm={handleRecipeDelete}
          onCancel={handleCloseConfirmationPrompt}
        />
      )}

      <Footer theme='red-dark' />
    </section>
  )
}

export default Recipes
