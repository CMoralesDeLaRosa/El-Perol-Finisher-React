import { useEffect, useState } from 'react'
import { API } from '../utils/API'

const useRestaurants = (restaurantId = null) => {
  const [restaurants, setRestaurants] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true)
      try {
        const endpoint = restaurantId
          ? `restaurants/${restaurantId}`
          : 'restaurants'
        const { status, response } = await API({
          endpoint,
          method: 'GET'
        })

        if (status === 200) {
          setRestaurants(response)
        } else {
          setError('Error al obtener los datos del restaurante')
        }
      } catch (error) {
        setError(`Error al conectar con la API: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [restaurantId])

  return { restaurants, error, loading }
}

export default useRestaurants
