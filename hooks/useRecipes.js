import { useEffect, useState } from 'react'
import { API } from '../utils/API'

const useRecipes = (recipeId = null) => {
  const [recipes, setRecipes] = useState(recipeId ? null : [])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true)
      try {
        const endpoint = recipeId ? `recipes/${recipeId}` : 'recipes'
        const { status, response } = await API({
          endpoint,
          method: 'GET'
        })

        if (status === 200) {
          setRecipes(response)
        } else {
          setError('Error al obtener los datos de la receta')
        }
      } catch (error) {
        setError('Error al conectar con la API')
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [recipeId])

  return { recipes, error, loading }
}

export default useRecipes
