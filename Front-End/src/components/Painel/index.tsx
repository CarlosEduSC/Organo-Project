import { useNavigate } from 'react-router-dom'
import './index.css'
import Menu from '../Menu'
import useAuthentication from '../../shared/methods/useAuthentication'

const Painel = () => {
  const navigate = useNavigate()

  const isAuthenticated = useAuthentication();

  
  const onClickLogo = () => {
    navigate('/')
  }

  return (
    <section className='painel'>
      <img
        className='logoPainel'
        src='/images/logo-branco.png'
        alt='Logo'
        onClick={onClickLogo} 
      />

      <h2 className='slogan'>Pessoas e equipes organizados em um só lugar!</h2>

      {isAuthenticated && (<Menu/>)}
    </section>
  )
}

export default Painel