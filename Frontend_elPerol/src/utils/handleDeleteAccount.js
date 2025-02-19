import { API } from './API'

export const handleDeleteAccount = async (token, userData, setError) => {
  try {
    if (!token || !userData || !userData._id) {
      throw new Error('Faltan datos necesarios para eliminar la cuenta.')
    }

    let endpoint
    if (userData.rol === 'user') {
      endpoint = `users/${userData._id}`
    } else if (userData.rol === 'restaurant') {
      endpoint = `restaurants/${userData._id}`
    } else {
      setError('Rol de usuario no válido.')
      return { success: false, error: 'Rol de usuario no válido.' }
    }

    const { status, response } = await API({
      endpoint,
      method: 'DELETE',
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
  } catch (err) {
    setError('Ocurrió un error, intente nuevamente')
    return { success: false, error: 'Ocurrió un error, intente nuevamente' }
  }
}
