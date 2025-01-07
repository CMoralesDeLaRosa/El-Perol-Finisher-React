import './UsersAdmin.css'
import { useEffect, useState } from 'react'
import { useUser } from '../../context/userProvider'
import Header from '../../components/HeaderComponents/Header'
import User from '../../components/User/User'
import Button from '../../components/Button/Button'
import Footer from '../../components/Footer/Footer'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import { BiMessageAltX } from 'react-icons/bi'
import { handleGetUsers } from '../../utils/handleGetUsers'
import { ConfirmationPromptUser } from '../../components/ConfirmationPrompt/ConfirmationPrompt'
import { handleDeleteAccountAdminUser } from '../../utils/handleDeleteAccountAdmin'

const UsersAdmin = () => {
  const { userData, token } = useUser()
  const [isConfirmationPromptVisible, setIsConfirmationPromptVisible] =
    useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [userToDelete, setUserToDelete] = useState(null)

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      setError('')
      try {
        const { users, error } = await handleGetUsers(userData, token, setError)
        if (error) {
          setError(error)
        } else {
          setUsers(users)
        }
      } catch (err) {
        setError('Error inesperado al cargar los usuarios')
      } finally {
        setLoading(false)
      }
    }

    if (userData && token) {
      loadUsers()
    }
  }, [token, userData])

  const handleConfirmationPromptData = (userId) => {
    setUserToDelete(userId)
    setIsConfirmationPromptVisible(true)
  }

  const handleCloseConfirmationPrompt = () => {
    setIsConfirmationPromptVisible(false)
    setUserToDelete(null)
  }

  const handleUserDelete = async () => {
    setLoading(true)
    try {
      await handleDeleteAccountAdminUser(
        userToDelete,
        token,
        userData,
        setError
      )
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userToDelete)
      )
      setIsConfirmationPromptVisible(false)
      setUserToDelete(null)
    } catch (error) {
      setError(error || 'Error al intentar eliminar el usuario.')
    } finally {
      setLoading(false)
    }
  }

  const renderUsers = () => {
    if (error) {
      return (
        <div className='no-users-container flex-container'>
          <p>Error al cargar usuarios: {error}</p>
          <BiMessageAltX className='edit-icon-alert-validate-admin' />
        </div>
      )
    }

    if (users.length === 0) {
      return (
        <div className='no-users-container flex-container'>
          <p>No hay usuarios disponibles</p>
          <BiMessageAltX className='edit-icon-alert-validate-admin' />
        </div>
      )
    }

    return users.map((user) => (
      <div key={user._id} className='article-user-admin-container'>
        <User
          userId={user._id}
          imgSrc={user.img}
          userName={user.name}
          userEmail={user.email}
        />
        <Button
          buttonTitle='x'
          type='button'
          onClick={() => handleConfirmationPromptData(user._id)}
          className='button-remove-user'
        />
      </div>
    ))
  }

  return (
    <section id='section-users-admin'>
      <Header />
      {error && <p className='error-message'>{error}</p>}
      <article className='article-users-admin'>
        {loading && <SpinnerLoading />}
        <article className='article-users-admin-details'>
          <h2>Todos los usuarios</h2>
          {renderUsers()}
        </article>
        {isConfirmationPromptVisible && (
          <ConfirmationPromptUser
            onConfirm={handleUserDelete}
            onCancel={handleCloseConfirmationPrompt}
          />
        )}
      </article>
      <Footer theme='footer-red-light' />
    </section>
  )
}

export default UsersAdmin
