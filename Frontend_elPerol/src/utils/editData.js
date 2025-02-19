import { API } from './API'

export const editData = async (id, field, value, token, type) => {
  if (!token) {
    throw new Error('Token de autenticación no encontrado.')
  }

  if (!['user', 'restaurant'].includes(type)) {
    throw new Error(
      'El tipo especificado no es válido. Debe ser "user" o "restaurant".'
    )
  }

  try {
    const isFormData = value instanceof FormData
    const endpoint = `${type === 'user' ? 'users' : 'restaurants'}/update/${id}`

    const { status, response } = await API({
      endpoint,
      method: 'PUT',
      body: isFormData ? value : { [field]: value },
      headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
      token
    })

    if (status === 200) {
      return { success: true, response }
    } else {
      return {
        success: false,
        error: response?.error || 'Ocurrió un error, intente nuevamente'
      }
    }
  } catch (error) {
    return { success: false, error: 'Ocurrió un error, intente nuevamente' }
  }
}
