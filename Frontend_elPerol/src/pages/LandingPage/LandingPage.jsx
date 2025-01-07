import './LandingPage.css'
import Header from '../../components/HeaderComponents/Header'
import MainPage from '../../components/LandingPageComponents/MainPage/MainPage'
import MainPageRecipes from '../../components/LandingPageComponents/MainPageRecipes/MainPageRecipes'
import MainPageRegister from '../../components/LandingPageComponents/MainPageRegister/MainPageRegister'
import MainPageRestaurants from '../../components/LandingPageComponents/MainPageRestaurants/MainPageRestaurants'
import MainPageMission from '../../components/LandingPageComponents/MainPageMission/MainPageMission'
import Footer from '../../components/Footer/Footer'

const LandingPage = () => {
  return (
    <section id='section-landing-page'>
      <Header />
      <MainPage />
      <MainPageRecipes />
      <MainPageRegister />
      <MainPageRestaurants />
      <MainPageMission />
      <Footer theme='red-light' />
    </section>
  )
}

export default LandingPage
