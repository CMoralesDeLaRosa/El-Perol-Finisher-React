import './LastRecipes.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Recipe from '../../Recipe/Recipe'
import Button from '../../Button/Button'
import useRecipes from '../../../hooks/useRecipes'

const LastRecipes = () => {
  const navigate = useNavigate()
  const { recipes, error } = useRecipes()
  const [lastRecipes, setLastRecipes] = useState([])

  useEffect(() => {
    const sortedRecipes = [...recipes].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
    setLastRecipes(sortedRecipes.slice(0, 4))
  }, [recipes])

  const handleButtonClickRecipes = () => {
    navigate('/recipes')
  }

  return (
    <section id='section-last-recipes' className='flex-container'>
      {error && <p className='error-message'>{error}</p>}
      <h2>Descubre las últimas recetas</h2>
      <article className='article-last-recipes flex-container'>
        {lastRecipes.length > 0 ? (
          lastRecipes.map((recipe, index) => (
            <Recipe
              key={recipe._id}
              id={recipe._id}
              imgSrc={recipe.img}
              RecipeName={recipe.name}
              RecipeLikes={recipe.likes}
              TextColor='light-text-recipe'
            />
          ))
        ) : (
          <p>No hay recetas disponibles</p>
        )}
      </article>
      <Button
        buttonTitle='Más recetas'
        className='button-dark-m'
        onClick={handleButtonClickRecipes}
      />
    </section>
  )
}

export default LastRecipes
