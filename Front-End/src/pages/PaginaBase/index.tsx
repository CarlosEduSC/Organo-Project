import Painel from '../../components/Painel'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

const PaginaBase = () => {
  return (
    <div className='pagina-base'>
        <Painel/>

        <Outlet/>

        <Footer/>
    </div>
  )
}

export default PaginaBase