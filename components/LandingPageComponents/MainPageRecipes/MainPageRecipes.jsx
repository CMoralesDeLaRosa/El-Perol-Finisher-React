import './MainPageRecipes.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Recipe from '../../Recipe/Recipe'
import Button from '../../Button/Button'
import useRecipes from '../../../hooks/useRecipes'

const MainPageRecipes = () => {
  const navigate = useNavigate()
  const { recipes, error } = useRecipes()
  const [filteredRecipes, setFilteredRecipes] = useState([])

  useEffect(() => {
    setFilteredRecipes(recipes)
  }, [recipes])

  const handleButtonClickRecipes = () => {
    navigate('/recipes')
  }

  return (
    <section id='section-main-page-recipes'>
      {error && <p className='error-message'>{error}</p>}
      <h2>Conoce y publica nuevas recetas</h2>
      <article className='article-main-page-recipes-carousel flex-container'>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <Recipe
              key={recipe._id}
              id={recipe._id}
              imgSrc={recipe.img}
              RecipeName={recipe.name}
              RecipeLikes={recipe.likes}
              TextColor='dark-text-recipe'
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

export default MainPageRecipes
