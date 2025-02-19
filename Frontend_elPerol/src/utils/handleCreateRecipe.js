import { API } from './API'

export const handleCreateRecipe = async (
  data,
  setError,
  setSuccessMessage,
  token,
  userData,
  updateUserData
) => {
  if (!token || !userData) {
    setError('Debes iniciar sesión para realizar esta acción.')
    return {
      success: false,
      error: 'Debes iniciar sesión para realizar esta acción.'
    }
  }

  const {
    img,
    name,
    region,
    difficulty,
    time,
    portions,
    ingredients,
    elaboration
  } = data

  let body
  if (img && img[0]) {
    if (img && img[0]) {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('region', region)
      formData.append('difficulty', difficulty)
      formData.append('time', time)
      formData.append('portions', portions)

      ingredients.forEach((ingredient) => {
        formData.append('ingredients[]', ingredient)
      })

      formData.append('elaboration', elaboration)
      formData.append('img', img[0])
      body = formData
    }
  } else {
    body = {
      name,
      region,
      difficulty,
      time,
      portions,
      ingredients,
      elaboration
    }
  }

  try {
    const { status, response } = await API({
      endpoint: 'recipes',
      method: 'POST',
      body,
      token
    })

    if (status === 201) {
      setSuccessMessage(
        'La receta ha sido creada y será revisada para su publicación ¡Gracias!'
      )

      const newRecipe = response

      const currentUserData = JSON.parse(localStorage.getItem('userData'))
      const updatedRecipes = [
        ...(currentUserData.recipes_created || []),
        newRecipe
      ]

      const updatedUserData = {
        ...currentUserData,
        recipes_created: updatedRecipes
      }
      updateUserData(updatedUserData)
      localStorage.setItem('userData', JSON.stringify(updatedUserData))
    } else {
      setError(response.error || 'Ocurrió un error, intente nuevamente')
      return {
        success: false,
        error: response.error || 'Ocurrió un error, intente nuevamente'
      }
    }
  } catch (err) {
    setError('Ocurrió un error, intente nuevamente')
    return { success: false, error: 'Ocurrió un error, intente nuevamente' }
  }
}
