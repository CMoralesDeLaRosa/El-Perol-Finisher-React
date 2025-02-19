export const API = async ({ endpoint, method = 'GET', url, body, token }) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  const urlFetch = url || `${import.meta.env.VITE_BASE_URL}${endpoint}`
  const options = { method, headers }

  if (body) {
    if (body instanceof FormData) {
      options.body = body
    } else {
      headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(body)
    }
  }

  try {
    const res = await fetch(urlFetch, options)
    const response = await res.json().catch(() => ({}))
    return { status: res.status, response }
  } catch (error) {
    console.error('Error en la API:', error)
    return {
      status: 500,
      response: { error: 'Error en la conexión con el servidor' }
    }
  }
}
