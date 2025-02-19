import { API } from './API'

export const handleValidateRecipe = async (id, token, userData, setError) => {
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

  try {
    const { status, response } = await API({
      endpoint: `recipes/validate/${id}`,
      method: 'PUT',
      body: { verified: true },
      token
    })

    if (status === 200) {
      return { success: true, response }
    } else {
      setError(response.error || 'Ocurrió un error, intente nuevamente')
      return {
        success: false,
        error: response.error || 'Ocurrió un error, intente nuevamente'
      }
    }
  } catch (error) {
    setError('Ocurrió un error, intente nuevamente')
    return { success: false, error: 'Ocurrió un error, intente nuevamente' }
  }
}
