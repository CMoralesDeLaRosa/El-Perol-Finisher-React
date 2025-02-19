import { API } from './API'

export const handleDeleteRecipe = async (
  id,
  token,
  userData,

  setError
) => {
  try {
    if (!id) {
      throw new Error('No se encontró un ID válido de la receta.')
    }

    if (!token || !userData) {
      setError('Debes iniciar sesión para realizar esta acción.')
      return {
        success: false,
        error: 'Debes iniciar sesión para realizar esta acción.'
      }
    }

    const { status, response } = await API({
      endpoint: `recipes/${id}`,
      method: 'DELETE',
      token
    })

    if (status === 200) {
      return {
        success: true,
        response
      }
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
