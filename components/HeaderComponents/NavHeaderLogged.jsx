import './Header.css'
import { useUser } from '../../context/userProvider'
import { NavLink, useNavigate } from 'react-router-dom'

export const NavHeaderLoggedLeft = () => {
  return (
    <nav className='nav-header-logged-left'>
      <ul className='ul-header-logged-left flex-container'>
        <li>
          <NavLink
            to='/recipes'
            className={({ isActive }) =>
              `link-recipes ${isActive ? 'active' : ''}`
            }
          >
            Recetas
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/restaurants'
            className={({ isActive }) =>
              `link-restaurants ${isActive ? 'active' : ''}`
            }
          >
            Restaurantes
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export const NavHeaderLoggedRight = () => {
  const navigate = useNavigate()
  const { userData } = useUser()

  const handleLogout = () => {
    localStorage.clear()
    updateToken(response.token)
    updateUserData(response.user)
    navigate('/')
  }

  return (
    <nav className='nav-header-logged-right'>
      <ul className='ul-header-logged-right flex-container'>
        {(userData.rol === 'user' || userData.rol === 'restaurant') && (
          <>
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
          </>
        )}
        {userData.rol === 'admin' && (
          <>
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
          </>
        )}
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
      </ul>
    </nav>
  )
}
