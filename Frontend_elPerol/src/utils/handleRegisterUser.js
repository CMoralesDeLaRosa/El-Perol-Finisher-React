import { API } from './API'
import { handleLoginUser } from './handleLoginUser'

export const handleRegisterUser = async (
  data,
  navigate,
  setError,
  updateUserData,
  updateToken
) => {
  const { img, name, email, password } = data

  const formData = new FormData()
  formData.append('name', name)
  formData.append('email', email)
  formData.append('password', password)

  if (img && img.length > 0) {
    formData.append('img', img[0])
  } else {
    setError('Es obligatorio incluir una imagen de perfil')
    return
  }

  try {
    const { status, response } = await API({
      endpoint: 'users/register',
      method: 'POST',
      body: formData
    })

    if (status === 201) {
      await handleLoginUser(
        { email, password },
        navigate,
        setError,
        updateUserData,
        updateToken
      )
    } else {
      setError(response.error || 'Ocurrió un error, intente nuevamente')
    }
  } catch (error) {
    setError('Ocurrió un error, intente nuevamente')
  }
}
