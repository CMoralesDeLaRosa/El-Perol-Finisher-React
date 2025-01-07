import './Header.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../../context/userProvider'
import NavHeader from './NavHeader'
import { NavHeaderLoggedLeft } from './NavHeaderLogged'
import { NavHeaderLoggedRight } from './NavHeaderLogged'
import Button from '../Button/Button'
import { HiMenu } from 'react-icons/hi'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userData } = useUser()
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false)

  const handleButtonClickLogin = () => {
    navigate('/login')
  }
  const handleButtonClickRegister = () => {
    navigate('/register')
  }
  const handleButtonClickLandingPage = () => {
    navigate('/')
  }
  const handleButtonClickUserLogged = () => {
    navigate('/logged')
  }
  const handleLogout = () => {
    localStorage.clear()
    updateUserData(null)
    navigate('/')
  }

  const handleMobileMenuToggle = () => {
    setMobileMenuVisible(!isMobileMenuVisible)
  }

  const isLoginPage = location.pathname === '/login'
  const isRegisterPage = location.pathname === '/register'

  return (
    <header id='header'>
      {userData &&
      (userData.rol === 'user' ||
        userData.rol === 'restaurant' ||
        userData.rol === 'admin') ? (
        <>
          <NavHeaderLoggedLeft />
          <div className='line-left'></div>
          <div className='div-header-logo flex-container'>
            <img
              src='https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244373/elperol/web-images/Logo-full.png'
              onClick={handleButtonClickUserLogged}
              alt='Logo El Perol'
            />
            <div className='line-right'></div>
          </div>
          <NavHeaderLoggedRight />
        </>
      ) : (
        <>
          <div className='div-header-left'>
            <NavHeader />
          </div>
          <div className='line-left'></div>
          <div className='div-header-logo flex-container'>
            <img
              src='https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244373/elperol/web-images/Logo-full.png'
              onClick={handleButtonClickLandingPage}
              alt='Logo El Perol'
            />
          </div>
          <div className='line-right'></div>
          <div className='div-header-right'>
            <Button
              buttonTitle='Login'
              className={`button-header ${isLoginPage ? 'button-active' : ''}`}
              onClick={handleButtonClickLogin}
            />
            <Button
              buttonTitle='Regístrate'
              className={`button-header-border ${
                isRegisterPage ? 'button-active' : ''
              }`}
              onClick={handleButtonClickRegister}
            />
          </div>
        </>
      )}

      <div className='mobile-menu-icon' onClick={handleMobileMenuToggle}>
        <HiMenu />
      </div>
      <div className={`mobile-menu ${isMobileMenuVisible ? 'visible' : ''}`}>
        <ul className='flex-container'>
          {!userData ? (
            <>
              <li>
                <NavLink
                  to='/recipes'
                  className={({ isActive }) =>
                    `recipes-login ${isActive ? 'li-active' : ''}`
                  }
                >
                  Recetas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/restaurants'
                  className={({ isActive }) =>
                    `link-restaurants ${isActive ? 'li-active' : ''}`
                  }
                >
                  Restaurantes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/login'
                  className={({ isActive }) =>
                    `link-login ${isActive ? 'li-active' : ''}`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/register'
                  className={({ isActive }) =>
                    `link-register ${isActive ? 'li-active' : ''}`
                  }
                >
                  Regístrate
                </NavLink>
              </li>
            </>
          ) : userData.rol === 'user' || userData.rol === 'restaurant' ? (
            <>
              <li>
                <NavLink
                  to='/recipes'
                  className={({ isActive }) =>
                    `link-recipes ${isActive ? 'li-active' : ''}`
                  }
                >
                  Recetas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/restaurants'
                  className={({ isActive }) =>
                    `link-restaurants ${isActive ? 'li-active' : ''}`
                  }
                >
                  Restaurantes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/logged/my-profile'
                  className={({ isActive }) =>
                    `link-mi-profile ${isActive ? 'active' : ''}`
                  }
                >
                  Mi perfil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `link-mi-profile ${isActive ? 'active' : ''}`
                  }
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </NavLink>
              </li>
            </>
          ) : userData.rol === 'admin' ? (
            <>
              <li>
                <NavLink
                  to='/recipes'
                  className={({ isActive }) =>
                    `link-recipes ${isActive ? 'li-active' : ''}`
                  }
                >
                  Recetas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/restaurants'
                  className={({ isActive }) =>
                    `link-restaurants ${isActive ? 'li-active' : ''}`
                  }
                >
                  Restaurantes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/admin/users'
                  className={({ isActive }) =>
                    `link-users ${isActive ? 'active' : ''}`
                  }
                >
                  Usuarios
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `link-mi-profile ${isActive ? 'active' : ''}`
                  }
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </NavLink>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </header>
  )
}

export default Header
