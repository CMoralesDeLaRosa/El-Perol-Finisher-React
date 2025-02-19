import './MainPageRegister.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
handleRegisterUser
import FormRegisterUser from '../../Forms/FormRegisterUser'
import Button from '../../Button/Button'
import SpinnerLoading from '../../SpinnerLoading/SpinnerLoading'

const MainPageRegister = () => {
  const navigate = useNavigate()
  const [userError, setUserError] = useState('')
  const [isHalfScrolled, setIsHalfScrolled] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUserRegister = async (data) => {
    setLoading(true)
    try {
      await handleRegisterUser(data, navigate, setUserError)
    } finally {
      setLoading(false)
    }
  }

  const handleButtonClickRegister = () => {
    navigate('/register')
  }

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('#section-main-page-register')
      const scrollPosition = window.scrollY + window.innerHeight
      const sectionHeight = section.offsetTop + section.clientHeight / 1

      if (scrollPosition >= sectionHeight) {
        setIsHalfScrolled(true)
      } else {
        setIsHalfScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id='section-main-page-register'
      className={isHalfScrolled ? 'scrolled' : ''}
    >
      <article className='article-main-page-register-form'>
        {loading && <SpinnerLoading />}
        <h2>Regístrate y comparte</h2>
        <div className='div-form-main-page'>
          <FormRegisterUser
            id='user'
            title='Crea tu cuenta básica'
            subtitle='Crea tus propias recetas, guarda recetas favoritas y conoce nuevos restaurantes.'
            className='form-main-page'
            type='userRegister'
            onSubmit={handleUserRegister}
            error={userError}
          />
        </div>
        <Button
          buttonTitle='¿Conoces la cuenta profesional?'
          className='button-light-m'
          onClick={handleButtonClickRegister}
        />
      </article>
      <article className='article-main-page-register-img flex-container'>
        <img
          src='https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244382/elperol/web-images/Main-page-image-2.png'
          alt='Plato de judías'
        />
      </article>
    </section>
  )
}

export default MainPageRegister
