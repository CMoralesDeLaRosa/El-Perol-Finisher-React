import { API } from './API'

export const updateUserLikes = async (
  userData,
  entity,
  entityId,
  action,
  type,
  token,
  setError,
  updateUserData
) => {
  if (!token || !userData) {
    setError('El token o los datos del usuario no son válidos.')
    return {
      success: false,
      error: 'El token o los datos del usuario no son válidos.'
    }
  }

  try {
    const userId = userData._id

    if (!['recipe', 'restaurant'].includes(type)) {
      setError('Tipo de entidad no soportado.')
      return {
        success: false,
        error: 'Tipo de entidad no soportado.'
      }
    }

    if (!['add', 'delete'].includes(action)) {
      setError('Acción no soportada.')
      return {
        success: false,
        error: 'Acción no soportada.'
      }
    }

    let endpoint = ''
    if (userData.rol === 'user') {
      endpoint = `users/${userId}/${action}-${type}/${entityId}`
    } else if (userData.rol === 'restaurant') {
      endpoint = `restaurants/${userId}/${action}-${type}/${entityId}`
    }

    if (!endpoint) {
      setError('No se pudo formar el endpoint correctamente.')
      return {
        success: false,
        error: 'No se pudo formar el endpoint correctamente.'
      }
    }

    const { status } = await API({
      endpoint,
      method: 'PUT',
      token
    })

    if (status === 200) {
      const favoritesKey =
        type === 'recipe' ? 'recipes_liked' : 'restaurants_liked'

      const currentFavorites = userData[favoritesKey] || []

      let updatedFavorites

      if (action === 'add') {
        if (!currentFavorites.some((item) => item._id === entityId)) {
          updatedFavorites = [...currentFavorites, entity]
        } else {
          updatedFavorites = currentFavorites
        }
      } else if (action === 'delete') {
        updatedFavorites = currentFavorites.filter(
          (item) => item._id !== entityId
        )
      }

      const updatedUserData = {
        ...userData,
        [favoritesKey]: updatedFavorites
      }

      localStorage.setItem('userData', JSON.stringify(updatedUserData))
      updateUserData(updatedUserData)

      return {
        success: true,
        message: `Acción ${action} realizada correctamente.`
      }
    } else {
      setError('Error al actualizar los favoritos.')
      return {
        success: false,
        error: 'Error al actualizar los favoritos.'
      }
    }
  } catch (error) {
    setError('Ocurrió un error, intente nuevamente.')
    return {
      success: false,
      error: 'Ocurrió un error, intente nuevamente.'
    }
  }
}

export const updateLikesInDatabase = async (
  entityId,
  action,
  token,
  setError,
  type
) => {
  try {
    let endpoint = ''

    if (!type || (type !== 'recipe' && type !== 'restaurant')) {
      setError('Tipo inválido proporcionado.')
      return { success: false, error: 'Tipo inválido proporcionado.' }
    }

    if (type === 'recipe') {
      endpoint = `recipes/${entityId}/like`
    } else if (type === 'restaurant') {
      endpoint = `restaurants/${entityId}/like`
    }

    const body = { action }

    const { status, data } = await API({
      endpoint,
      method: 'PUT',
      token,
      body
    })

    if (status === 200) {
      return {
        success: true,
        message: `Likes de ${type} actualizados correctamente.`
      }
    } else {
      setError(data?.error || 'Error al actualizar los likes.')
      return {
        success: false,
        error: data?.error || 'Error al actualizar los likes.'
      }
    }
  } catch (error) {
    setError('Ocurrió un error, intente nuevamente.')
    return {
      success: false,
      error: 'Ocurrió un error, intente nuevamente.'
    }
  }
}
