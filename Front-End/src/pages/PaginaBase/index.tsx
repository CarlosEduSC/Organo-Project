import './index.css'
import Painel from '../../components/Painel'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

const PaginaBase = () => {
  return (
    <div className='pagina-base'>
      <Painel />
      <section className='conteudo'>
        <Outlet />
      </section>

      <Footer />
    </div>
  )
}

export default PaginaBase