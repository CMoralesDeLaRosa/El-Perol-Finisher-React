import './Header.css'
import { NavLink } from 'react-router-dom'

const NavHeader = () => {
  return (
    <nav>
      <ul className='ul-header flex-container'>
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
      </ul>
    </nav>
  )
}

export default NavHeader
