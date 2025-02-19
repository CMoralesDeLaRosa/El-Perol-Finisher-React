import { API } from './API'

export const handleDeleteRestaurant = async (id, token, userData, setError) => {
  try {
    if (!id) {
      throw new Error('No se encontró un ID válido del restaurante.')
    }

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
    setError('Ocurrió un error, intente nuevamente')
    return { success: false, error: 'Ocurrió un error, intente nuevamente' }
  }
}
