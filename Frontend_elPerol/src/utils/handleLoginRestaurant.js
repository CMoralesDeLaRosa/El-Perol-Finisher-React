import { API } from './API'

export const handleLoginRestaurant = async (
  data,
  navigate,
  setError,
  updateUserData,
  updateToken
) => {
  const { email, password } = data

  try {
    const { status, response } = await API({
      endpoint: 'restaurants/login',
      method: 'POST',
      body: { email, password },
      token: null
    })

    if (status === 200) {
      updateToken(response.token)
      updateUserData(response.restaurant)

      navigate('/logged')
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
