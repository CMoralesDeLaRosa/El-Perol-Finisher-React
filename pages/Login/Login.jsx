import './Login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/HeaderComponents/Header'
import { handleLoginRestaurant } from '../../utils/handleLoginRestaurant'
import { handleLoginUser } from '../../utils/handleLoginUser'
import SwitchButton from '../../components/SwitchButton/SwitchButton'
import FormLogin from '../../components/Forms/FormLogin'
import Footer from '../../components/Footer/Footer'
import { useUser } from '../../context/userProvider'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'

const Login = () => {
  const [error, setError] = useState('')
  const [isUserLogin, setIsUserLogin] = useState(true)
  const navigate = useNavigate()
  const { updateUserData, updateToken } = useUser()
  const [loading, setLoading] = useState(false)

  const onLoginUser = async (data) => {
    setLoading(true)
    try {
      await handleLoginUser(
        data,
        navigate,
        setError,
        updateUserData,
        updateToken
      )
    } finally {
      setLoading(false)
    }
  }

  const onLoginRest = async (data) => {
    setLoading(true)
    try {
      await handleLoginRestaurant(
        data,
        navigate,
        setError,
        updateUserData,
        updateToken
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSwitchChange = () => {
    setIsUserLogin(!isUserLogin)
    setError(null)
  }

  return (
    <section id='section-login'>
      <Header />
      <article className='article-form-login flex-container'>
        {loading && <SpinnerLoading />}
        <div className='form-container'>
          <FormLogin
            id='user-login'
            title={['Iniciar sesión ', 'Usuario']}
            className={`form-login-user ${isUserLogin ? 'active' : 'inactive'}`}
            type='login'
            onSubmit={onLoginUser}
            error={isUserLogin ? error : null}
          />
          <FormLogin
            id='restaurant-login'
            title={['Iniciar sesión ', 'Restaurante']}
            className={`form-login-restaurant ${
              isUserLogin ? 'inactive' : 'active'
            }`}
            type='login'
            onSubmit={onLoginRest}
            error={!isUserLogin ? error : null}
          />
        </div>
        <div className='div-login-img'>
          <div className='div-img-login-left'>
            <img
              src='https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244369/elperol/web-images/Plate-image-1.png'
              alt='Rice'
            />
          </div>
          <div className='div-img-login-right'>
            <img
              src='https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244365/elperol/web-images/Plate-image-2.png'
              alt='Ingredients'
            />
          </div>
        </div>
      </article>
      <article className='article-form-switch flex-container'>
        <div
          className={`flex-container ${
            isUserLogin ? 'active-switch' : 'no-active-switch'
          }`}
        >
          <p>Básica</p>
        </div>
        <SwitchButton isChecked={!isUserLogin} onChange={handleSwitchChange} />
        <div
          className={`flex-container ${
            !isUserLogin ? 'active-switch' : 'no-active-switch'
          }`}
        >
          <p>Profesional</p>
        </div>
      </article>
      <Footer theme='red-dark' />
    </section>
  )
}

export default Login
