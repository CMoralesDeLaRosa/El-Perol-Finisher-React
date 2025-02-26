import './Login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/HeaderComponents/Header'
import { handleLogin } from '../../utils/handleLogin'
import FormLogin from '../../components/Forms/FormLogin'
import Footer from '../../components/Footer/Footer'
import { useUser } from '../../context/userProvider'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'

const Login = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { updateUserData, updateToken } = useUser()
  const [loading, setLoading] = useState(false)

  const onLogin = async (data) => {
    setLoading(true)
    try {
      await handleLogin(data, navigate, setError, updateUserData, updateToken)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id='section-login'>
      <Header />
      <article className='article-form-login flex-container'>
        {loading && <SpinnerLoading />}
        <FormLogin
          id='login'
          title={['Iniciar sesión ']}
          className='form-login'
          type='login'
          onSubmit={onLogin}
        />
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
      <Footer theme='red-dark' />
    </section>
  )
}

export default Login
