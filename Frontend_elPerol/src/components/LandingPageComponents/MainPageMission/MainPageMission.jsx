import './MainPageMission.css'

const missionGoals = [
  {
    id: 1,
    imgSrc:
      'https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244387/elperol/web-images/Mission-image-1.png',
    imgAlt: 'Plato de carne con verduras',
    text: 'Mostrar la riqueza de la gastronomía española, desde platos icónicos hasta los menos conocidos'
  },
  {
    id: 2,
    imgSrc:
      'https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244390/elperol/web-images/Mission-image-2.png',
    imgAlt: 'Plato de huevos fritos con salchichas',
    text: 'Fomentar el consumo de productos locales y de temporada, promoviendo una alimentación sostenible y de calidad'
  },
  {
    id: 3,
    imgSrc:
      'https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244393/elperol/web-images/Mission-image-3.png',
    imgAlt: 'Plato de patatas con verduras',
    text: 'Impulsar los negocios locales y la economía regional, dando visibilidad a los establecimientos y productores nacionales'
  }
]

const MainPageMission = () => {
  return (
    <section id='section-main-page-mission'>
      <article className='article-main-page-mission flex-container'>
        <h2>Nuestros objetivos</h2>
        <div className='div-main-page-mission-goals'>
          {missionGoals.map(({ id, imgSrc, imgAlt, text }) => (
            <div key={id} className='div-main-page-mission-goal'>
              <img src={imgSrc} alt={imgAlt} />
              <div className='div-p-mission flex-container'>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
      <article className='article-main-page-mission-img flex-container'>
        <img
          src='https://res.cloudinary.com/dmztjnlrp/image/upload/v1735244384/elperol/web-images/Main-page-image-3.jpg'
          alt='Plato de judías pintas'
        />
      </article>
    </section>
  )
}

export default MainPageMission
