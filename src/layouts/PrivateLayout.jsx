import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import RutaProtegida from '../components/RutaProtegida'

const PrivateLayout = () => (
  <RutaProtegida>
    <Header />
    <Nav />
    <Outlet />
    <Footer />
  </RutaProtegida>
)

export default PrivateLayout
