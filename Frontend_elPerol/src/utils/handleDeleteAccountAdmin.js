import { API } from './API'

export const handleDeleteAccountAdminUser = async (
  id,
  token,
  userData,
  setError
) => {
  try {
    if (!token || !userData) {
      setError('Debes iniciar sesión para realizar esta acción.')
      return {
        success: false,
        error: 'Debes iniciar sesión para realizar esta acción.'
      }
    }

    if (userData?.rol !== 'admin') {
      setError('No tienes permisos para realizar esta acción.')
      return {
        success: false,
        error: 'No tienes permisos para realizar esta acción.'
      }
    }

    const { status, response } = await API({
      endpoint: `users/${id}`,
      method: 'DELETE',
      token
    })

    if (status === 200) {
      return response
    } else {
      setError(response.error || 'Ocurrió un error, intente nuevamente')
      return {
        success: false,
        error: response.error || 'Ocurrió un error, intente nuevamente'
      }
    }
  } catch (err) {
    console.error('Error al eliminar usuario:', err)
    setError('Ocurrió un error, intente nuevamente')
    return { success: false, error: 'Ocurrió un error, intente nuevamente' }
  }
}

export const handleDeleteAccountAdminRestaurant = async (
  id,
  token,
  userData,
  setError
) => {
  try {
    if (!token || !userData) {
      setError('Debes iniciar sesión para realizar esta acción.')
      return {
        success: false,
        error: 'Debes iniciar sesión para realizar esta acción.'
      }
    }
    if (userData?.rol !== 'admin') {
      setError('No tienes permisos para realizar esta acción.')
      return {
        success: false,
        error: 'No tienes permisos para realizar esta acción.'
      }
    }

    const { status, response } = await API({
      endpoint: `restaurants/${id}`,
      method: 'DELETE',
      token
    })

    if (status === 200) {
      return response
    } else {
      setError(response.error || 'Ocurrió un error, intente nuevamente')
      return {
        success: false,
        error: response.error || 'Ocurrió un error, intente nuevamente'
      }
    }
  } catch (err) {
    console.error('Error al eliminar restaurante:', err)
    setError('Ocurrió un error, intente nuevamente')
    return { success: false, error: 'Ocurrió un error, intente nuevamente' }
  }
}

export const handleDeleteAccountAdminRecipe = async (
  id,
  token,
  userData,
  updateUserData,
  setError
) => {
  try {
    if (!token || !userData) {
      setError('Debes iniciar sesión para realizar esta acción.')
      return {
        success: false,
        error: 'Debes iniciar sesión para realizar esta acción.'
      }
    }

    if (userData?.rol !== 'admin') {
      setError('No tienes permisos para realizar esta acción.')
      return {
        success: false,
        error: 'No tienes permisos para realizar esta acción.'
      }
    }

    const { status, response } = await API({
      endpoint: `recipes/${id}`,
      method: 'DELETE',
      token
    })

    if (status === 200) {
      const recipeExists = userData?.recipes_created?.some(
        (recipe) => recipe._id === id
      )

      console.log('si', recipeExists)

      if (recipeExists) {
        const updatedRecipes = userData.recipes_created.filter(
          (recipe) => recipe._id !== id
        )
        const updatedUserData = { ...userData, recipes_created: updatedRecipes }

        localStorage.setItem('userData', JSON.stringify(updatedUserData))
        updateUserData(updatedUserData)
      }

      return response
    } else {
      setError(response.error || 'Ocurrió un error, intente nuevamente')
      return {
        success: false,
        error: response.error || 'Ocurrió un error, intente nuevamente'
      }
    }
  } catch (err) {
    console.error('Error al eliminar receta:', err)
    setError('Ocurrió un error, intente nuevamente')
    return { success: false, error: 'Ocurrió un error, intente nuevamente' }
  }
}
