import './MyData.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../context/userProvider'
import { handleDeleteAccount } from '../../../utils/handleDeleteAccount'
import { ConfirmationPromptUser } from '../../ConfirmationPrompt/ConfirmationPrompt'
import MyPersonalData from './MyPersonalData/MyPersonalData.jsx'
import MyRecipesCreated from './MyRecipesCreated/MyRecipesCreated'
import Button from '../../Button/Button'
import SpinnerLoading from '../../SpinnerLoading/SpinnerLoading'

const MyData = () => {
  const { userData, updateUserData, updateToken, token } = useUser()
  const [isConfirmationPromptVisible, setIsConfirmationPromptVisible] =
    useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState('')

  const handleConfirmationPromptData = () => {
    setIsConfirmationPromptVisible(true)
  }

  const handleCloseConfirmationPrompt = () => {
    setIsConfirmationPromptVisible(false)
  }

  const handleLogout = () => {
    localStorage.clear()
    updateToken(null)
    updateUserData(null)
    navigate('/')
  }

  const handleAccountDelete = async () => {
    setLoading(true)
    try {
      await handleDeleteAccount(token, userData, setError)
      setIsConfirmationPromptVisible(false)
      handleLogout()
    } catch (error) {
      setError(
        'Ocurrió un error al intentar eliminar la cuenta. Por favor, intenta de nuevo.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!userData) {
    return (
      <p className='error-message'>
        No se pudieron cargar los datos del usuario.
      </p>
    )
  }

  return (
    <section
      id='section-my-data'
      className={`section-my-data ${
        userData.rol === 'user'
          ? 'user'
          : userData.rol === 'restaurant'
          ? 'restaurant'
          : userData.rol === 'admin'
          ? 'admin'
          : ''
      }`}
    >
      {error && <p className='error-message'>{error}</p>}
      <article className='article-my-data flex-container'>
        {loading && <SpinnerLoading />}
        <div className='flex-container'>
          <MyPersonalData />
          <MyRecipesCreated />
        </div>
        <Button
          buttonTitle='Eliminar mi cuenta'
          className='button-light-s'
          onClick={handleConfirmationPromptData}
        />
      </article>
      {isConfirmationPromptVisible && (
        <ConfirmationPromptUser
          onConfirm={handleAccountDelete}
          onCancel={handleCloseConfirmationPrompt}
          className={userData.rol === 'user' ? '' : 'restaurant'}
        />
      )}
    </section>
  )
}

export default MyData
