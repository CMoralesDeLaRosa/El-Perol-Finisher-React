import './BannerHello.css'
import { useUser } from '../../../context/userProvider'

const BannerHello = () => {
  const { userData } = useUser()
  const userName = userData?.name || 'invitado'
  const userImg = userData?.img || ''
  const userRole = userData?.rol || 'guest'

  const message =
    userRole === 'admin'
      ? '¿Qué tal estás hoy?'
      : 'descubre las novedades que tenemos hoy'

  return (
    <section id='section-banner-hello'>
      <div className='div-banner-hello-img'>
        <img src={userImg} alt='Imagen de usuario' />
      </div>
      <p>
        Hola <span className='user-name'>{userName}</span>, {message}
      </p>
    </section>
  )
}

export default BannerHello
