import { API } from './API'

export const handleUpdatePhrases = async (
  restaurantId,
  token,
  updatedPhrase,
  index,
  setPhrases,
  setError
) => {
  try {
    const { status, response } = await API({
      endpoint: `restaurants/${restaurantId}/phrases`,
      method: 'PUT',
      body: { phrase: updatedPhrase, index },
      token
    })

    if (status === 200) {
      setPhrases(response.phrases)
      return response.phrases
    } else {
      setError(response?.error || 'Error al actualizar las frases.')
      return {
        success: false,
        error: response?.error || 'Error al actualizar las frases.'
      }
    }
  } catch (error) {
    setError('Ocurrió un error, intente nuevamente.')
    return {
      success: false,
      error: 'Ocurrió un error, intente nuevamente.'
    }
  }
}
