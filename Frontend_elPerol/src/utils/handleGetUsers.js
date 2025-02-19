import { API } from './API'

export const handleGetUsers = async (userData, token, setError) => {
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
    const endpoint = 'users'
    const { status, response } = await API({
      endpoint,
      method: 'GET',
      token
    })

    if (status === 200) {
      return { users: response, error: null }
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
