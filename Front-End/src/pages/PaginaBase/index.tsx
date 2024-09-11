import Painel from '../../components/Painel'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

const PaginaBase = () => {
  return (
    <>
        <Painel/>

        <Outlet/>

        <Footer/>
    </>
  )
}

export default PaginaBase