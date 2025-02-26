import React, { useState, useEffect } from 'react'
import './RecipeDetails.css'
import { useParams } from 'react-router-dom'
import { useUser } from '../../context/userProvider'
import Header from '../../components/HeaderComponents/Header'
import Footer from '../../components/Footer/Footer'
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import useRecipes from '../../hooks/useRecipes'
import { updateLikesInDatabase, updateUserLikes } from '../../utils/handleLikes'

const RecipeDetails = () => {
  const { userData, updateUserData, token } = useUser()
  const { id: recipeId } = useParams()
  const { recipes: recipe, loading, error: recipeError } = useRecipes(recipeId)
  const [isLiked, setIsLiked] = useState(false)
  const [error, setError] = useState('')
  const [isDefaultImage, setIsDefaultImage] = useState(false) // Nuevo estado para la clase

  const defaultImg =
    'https://res.cloudinary.com/dmztjnlrp/image/upload/v1740596110/elperol/web-images/Default-image.png'

  const handleImageError = (e) => {
    e.target.src = defaultImg
    setIsDefaultImage(true) // Cambia el estado a `true` cuando la imagen es la predeterminada
  }

  useEffect(() => {
    if (!loading) {
      if (userData) {
        if (Array.isArray(userData.recipes_liked)) {
          const isLiked = userData.recipes_liked.some(
            (recipe) => recipe._id === recipeId
          )
          setIsLiked(isLiked)
        } else {
          return
        }
      }
    }
  }, [userData, recipeId, loading])

  const handleHeartClick = async () => {
    if (!userData) {
      setError('Debes iniciar sesión para añadir a favoritos.')
      return
    }

    const action = isLiked ? 'delete' : 'add'

    try {
      const response = await updateLikesInDatabase(
        recipeId,
        action,
        token,
        setError,
        'recipe'
      )

      if (response.success) {
        setIsLiked(!isLiked)
        recipe.likes = isLiked ? recipe.likes - 1 : recipe.likes + 1
      } else {
        setError(
          response.error ||
            'Error al actualizar los favoritos. Inténtalo de nuevo.'
        )
        return
      }
    } catch (error) {
      setError('Error al actualizar los favoritos. Inténtalo de nuevo.')
      return
    }

    try {
      const response = await updateUserLikes(
        userData,
        recipe,
        recipeId,
        action,
        'recipe',
        token,
        setError,
        updateUserData
      )

      if (response.success) {
      } else {
        setError(
          response.error ||
            'Error al actualizar los favoritos del usuario. Inténtalo de nuevo.'
        )
      }
    } catch (error) {
      setError(
        'Error al actualizar los favoritos del usuario. Inténtalo de nuevo.'
      )
    }
  }

  if (loading) {
    return <SpinnerLoading />
  }

  if (!recipe) {
    return (
      <p className='error-message'>{error || 'No se encontró la receta.'}</p>
    )
  }

  return (
    <section id='section-recipe-details'>
      <Header />
      {error && <p className='error-message'>{error}</p>}
      <article className='article-recipe-main-details'>
        <div className='div-recipe-details-img'>
          <h2>{recipe.name}</h2>
          <img
            src={recipe.img || defaultImg}
            alt={recipe.name}
            onError={handleImageError}
            className={
              isDefaultImage
                ? 'recipe-details-image-default'
                : 'recipe-details-image'
            }
          />
          <div className='div-likes-recipe-details' onClick={handleHeartClick}>
            {isLiked ? (
              <IoHeartSharp className='icon-like-recipe-details-full' />
            ) : (
              <IoHeartOutline className='icon-like-recipe-details-empty' />
            )}
            <h4>{recipe.likes}</h4>
          </div>
        </div>

        <div className='div-recipe-details flex-container'>
          <p>Región | {recipe.region}</p>
          <p>Dificultad | {recipe.difficulty}</p>
          <p>Tiempo | {recipe.time} min</p>
          <p>Porciones | {recipe.portions}</p>
        </div>
      </article>
      <article className='article-recipe-instructions-details flex-container'>
        <div className='div-ingredients-recipe-details flex-container'>
          <h3>Ingredientes</h3>
          <ul className='flex-container'>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <li key={index}>| {ingredient} |</li>
              ))
            ) : (
              <li>No hay ingredientes disponibles.</li>
            )}
          </ul>
        </div>
        <div className='div-elaboration-recipe-details '>
          <h3>Elaboración</h3>
          <p>{recipe.elaboration}</p>
        </div>
      </article>
      <Footer theme='footer-red-light' />
    </section>
  )
}

export default RecipeDetails
