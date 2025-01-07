import './Footer.css'
import { MdMailOutline } from 'react-icons/md'
import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { RiTwitterXLine } from 'react-icons/ri'

const socialIcons = [
  { id: 1, Icon: MdMailOutline },
  { id: 2, Icon: FaFacebookF },
  { id: 3, Icon: FaInstagram },
  { id: 4, Icon: FaYoutube },
  { id: 5, Icon: RiTwitterXLine }
]

const Footer = ({ theme = 'red-light' }) => {
  const footerClass = `footer-${theme}`

  return (
    <footer className={footerClass}>
      <article className='article-footer-social-media '>
        <div className='div-footer-line'></div>
        <div className='div-footer-icons flex-container'>
          {socialIcons.map(({ id, Icon }) => (
            <div key={id} className='div-footer-icon flex-container'>
              <Icon className='icon-footer' />
            </div>
          ))}
        </div>
        <div className='div-footer-line'></div>
      </article>
      <article className='article-footer-social-copyright flex-container'>
        <div className='div-footer-logo flex-container'>
          <img
            src='https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244373/elperol/web-images/Logo-full.png'
            alt='Logo El Perol'
          />
        </div>
        <p>Copyright @ 2024 Cristina Morales de la Rosa</p>
      </article>
    </footer>
  )
}

export default Footer
