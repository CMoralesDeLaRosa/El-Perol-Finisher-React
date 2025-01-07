import './MainPage.css'
import React, { useEffect, useState } from 'react'
import { MdDoubleArrow } from 'react-icons/md'

const MainPage = () => {
  const [showArrow, setShowArrow] = useState(false)
  const [showSecondText, setShowSecondText] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true)
    }, 5000)
    const secondTextTimer = setTimeout(() => {
      setShowSecondText(true)
    }, 3000)

    return () => {
      clearTimeout(secondTextTimer)
    }
  }, [])

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  const text = 'De nuestra cocina a tu mesa. Tradición española para el mundo.'

  return (
    <section id='section-main-page'>
      <article className='article-img-main-page'>
        <img
          src='https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244376/elperol/web-images/Main-page-image-1.jpg'
          alt='food-image'
        />
      </article>
      <div className='div-p-main-page flex-container'>
        <p className='animated-text-main'>
          {text.split(' ').map((word, wordIndex) => (
            <span
              key={wordIndex}
              className='animated-word'
              style={{
                animationDelay: `${wordIndex * 0.2}s`
              }}
            >
              {word}{' '}
            </span>
          ))}
        </p>
        {showSecondText && (
          <p className='slide-up-text'>CREA | DESCUBRE | COMPARTE</p>
        )}
      </div>
      {showArrow && (
        <div className='arrow-container' onClick={handleScrollDown}>
          <MdDoubleArrow className='icon-arrow' />
        </div>
      )}
    </section>
  )
}

export default MainPage
