import './ValidateRestaurantsAdmin.css'
import { useEffect, useState } from 'react'
import { useUser } from '../../../context/userProvider'
import RestaurantNonVerified from '../../RestaurantNonVerified/RestaurantNonVerified'
import Button from '../../Button/Button'
import { BiMessageAltX } from 'react-icons/bi'
import { handleNonVerifiedRestaurants } from '../../../utils/handleNonVerifiedRestaurants'
import { handleDeleteRestaurant } from '../../../utils/handleDeleteRestaurant'
import { ConfirmationPromptRestaurant } from '../../ConfirmationPrompt/ConfirmationPrompt'
import { handleValidateRestaurant } from '../../../utils/handleValidateRestaurant'
import SpinnerLoading from '../../SpinnerLoading/SpinnerLoading'

const ValidateRestaurantsAdmin = () => {
  const { userData, token } = useUser()
  const [nonVerifiedRestaurants, setNonVerifiedRestaurants] = useState([])
  const [restaurantToDelete, setRestaurantToDelete] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirmationPromptVisibility, setConfirmationPromptVisibility] =
    useState({})

  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true)
      try {
        const { restaurants, error } = await handleNonVerifiedRestaurants(
          token,
          userData,
          setError
        )
        setNonVerifiedRestaurants(restaurants)
        setError(error)
      } catch (error) {
        setError('Error inesperado al cargar restaurantes')
      } finally {
        setLoading(false)
      }
    }

    loadRestaurants()
  }, [token, userData])

  const handleConfirmationPromptData = (restaurantId) => {
    setRestaurantToDelete(restaurantId)
    setConfirmationPromptVisibility((prevState) => ({
      ...prevState,
      [restaurantId]: true
    }))
  }

  const handleCloseConfirmationPrompt = (restaurantId) => {
    setConfirmationPromptVisibility((prevState) => ({
      ...prevState,
      [restaurantId]: false
    }))
  }

  const handleRestaurantDelete = async () => {
    setLoading(true)
    try {
      await handleDeleteRestaurant(
        restaurantToDelete,
        token,
        userData,
        setError
      )
      setNonVerifiedRestaurants((prevRestaurants) =>
        prevRestaurants.filter(
          (restaurant) => restaurant._id !== restaurantToDelete
        )
      )
    } catch (error) {
      setError('Error inesperado al eliminar el restaurante')
    } finally {
      setLoading(false)
      setRestaurantToDelete(null)
    }
  }

  const validateRestaurant = async (restaurantId) => {
    setLoading(true)
    try {
      const result = await handleValidateRestaurant(
        restaurantId,
        token,
        userData,
        setError
      )
      if (result.success) {
        setNonVerifiedRestaurants((prevRestaurants) =>
          prevRestaurants.filter(
            (restaurant) => restaurant._id !== restaurantId
          )
        )
      } else {
        setError(result.error || 'Error al validar el restaurante')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id='section-validate-restaurants-admin' className='flex-container'>
      {error && <p className='error-message'>{error}</p>}
      <h2>Restaurantes pendientes de validar</h2>
      {loading ? (
        <SpinnerLoading />
      ) : error ? (
        <p className='general-error'>{error}</p>
      ) : nonVerifiedRestaurants.length === 0 ? (
        <div className='no-restaurants-non-verified-container flex-container'>
          <p>No hay restaurantes pendientes de validación</p>
          <BiMessageAltX className='edit-icon-alert-validate-admin' />
        </div>
      ) : (
        <article className='article-admin-restaurants-non-verified'>
          {nonVerifiedRestaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className='restaurants-non-verified-admin-container flex-container'
            >
              <RestaurantNonVerified
                restaurantId={restaurant._id}
                imgSrc={restaurant.img}
                restaurantName={restaurant.name}
                email={restaurant.email}
                address={restaurant.address}
                schedule={restaurant.schedule}
              />
              <div className='div-buttons-restaurants-non-verified-admin flex-container'>
                <Button
                  buttonTitle='Validar'
                  className='button-light-xs'
                  onClick={() => validateRestaurant(restaurant._id)}
                />
                <Button
                  buttonTitle='Eliminar'
                  type='button'
                  onClick={() => handleConfirmationPromptData(restaurant._id)}
                  className='button-light-xs'
                />
              </div>
              {confirmationPromptVisibility[restaurant._id] && (
                <ConfirmationPromptRestaurant
                  onConfirm={handleRestaurantDelete}
                  onCancel={() => handleCloseConfirmationPrompt(restaurant._id)}
                />
              )}
            </div>
          ))}
        </article>
      )}
    </section>
  )
}

export default ValidateRestaurantsAdmin
