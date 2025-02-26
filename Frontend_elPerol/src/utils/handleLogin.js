import { API } from './API'

export const handleLogin = async (
  data,
  navigate,
  setError,
  updateUserData,
  updateToken
) => {
  const { email, password } = data

  try {
    const { status, response } = await API({
      endpoint: 'login',
      method: 'POST',
      body: { email, password },
      token: null
    })

    if (status === 200) {
      updateToken(response.token)
      updateUserData(response.user)

      navigate('/logged')
      return { success: true }
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
