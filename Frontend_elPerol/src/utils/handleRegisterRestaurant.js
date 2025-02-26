import { API } from './API'

export const handleRegisterRestaurant = async (data, setError, setSuccess) => {
  const { img, name, email, password, address, schedule } = data

  const formData = new FormData()
  formData.append('name', name)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('address', address)
  formData.append('schedule', schedule)

  if (img && img.length > 0) {
    formData.append('img', img[0])
  } else {
    setError('Es obligatorio incluir una imagen de perfil')
    return
  }

  try {
    const { status, response } = await API({
      endpoint: 'restaurants/register',
      method: 'POST',
      body: formData
    })

    if (status === 201) {
      setSuccess(
        '¡Te has registrado! Revisamos tu cuenta, si todo es correcto la validamos y podrás iniciar sesión.'
      )
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
