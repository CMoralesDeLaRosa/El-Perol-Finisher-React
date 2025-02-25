import './Register.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/HeaderComponents/Header'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import FormRegisterUser from '../../components/Forms/FormRegisterUser'
import FormRegisterRestaurant from '../../components/Forms/FormRegisterRestaurant'
import Footer from '../../components/Footer/Footer'
import { handleRegisterUser } from '../../utils/handleRegisterUser'
import { handleRegisterRestaurant } from '../../utils/handleRegisterRestaurant'
import { useUser } from '../../context/userProvider'
import SwitchButton from '../../components/SwitchButton/SwitchButton'

const Register = () => {
  const navigate = useNavigate()
  const [userError, setUserError] = useState('')
  const [restaurantError, setRestaurantError] = useState('')
  const [loading, setLoading] = useState(false)
  const { updateUserData, updateToken } = useUser()
  const [restaurantSuccess, setRestaurantSuccess] = useState('')
  const [resetForm, setResetForm] = useState(false)
  const [isUserRegister, setIsUserRegister] = useState(true)

  const handleUserRegister = async (data) => {
    setLoading(true)
    try {
      await handleRegisterUser(
        data,
        navigate,
        setUserError,
        updateUserData,
        updateToken
      )
    } finally {
      setLoading(false)
    }
  }

  const handleRestaurantRegister = async (data) => {
    setLoading(true)
    setRestaurantError('')
    try {
      await handleRegisterRestaurant(
        data,
        setRestaurantError,
        setRestaurantSuccess
      )
      setResetForm(true)
    } catch (error) {
      setRestaurantError(
        'Ocurrió un error al intentar registrar la cuenta. Por favor, intenta de nuevo.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSwitchChange = () => {
    setIsUserRegister(!isUserRegister)
  }

  return (
    <section id='section-register'>
      <Header />
      {loading && <SpinnerLoading />}
      <article className='article-form-register flex-container'>
        <div className='form-container'>
          <FormRegisterUser
            id='user'
            title='Cuenta básica'
            subtitle='Crea tus propias recetas, guarda recetas favoritas y conoce nuevos restaurantes.'
            className={`form-register-user ${
              isUserRegister ? 'active' : 'inactive'
            }`}
            onSubmit={handleUserRegister}
            userError={userError}
          />
          <FormRegisterRestaurant
            id='restaurant'
            title='Cuenta profesional'
            subtitle='Da a conocer tu restaurante para poder llegar a más clientes de tu zona.'
            className={`form-register-restaurant ${
              isUserRegister ? 'inactive' : 'active'
            }`}
            onSubmit={handleRestaurantRegister}
            restaurantError={restaurantError}
            restaurantSuccess={restaurantSuccess}
            setRestaurantSuccess={setRestaurantSuccess}
            resetForm={resetForm}
            setResetForm={setResetForm}
          />
        </div>
      </article>
      <article className='article-form-switch flex-container'>
        <div
          className={`flex-container ${
            isUserRegister ? 'active-switch' : 'no-active-switch'
          }`}
        >
          <p>Básica</p>
        </div>
        <SwitchButton
          isChecked={!isUserRegister}
          onChange={handleSwitchChange}
        />
        <div
          className={`flex-container ${
            !isUserRegister ? 'active-switch' : 'no-active-switch'
          }`}
        >
          <p>Profesional</p>
        </div>
      </article>
      <Footer theme='red-dark' />
    </section>
  )
}

export default Register
