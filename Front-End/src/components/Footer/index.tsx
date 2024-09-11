import { useNavigate } from 'react-router-dom'
import './index.css'

const Footer = () => {
  const navigate = useNavigate()

  const onClickLogo = () => {
    navigate('/')
  }

  return (
    <footer className="footer">
      <div className='social-media'>
        <a href='https://m.facebook.com/VancityReynolds/'>
          <img className='social' src='/images/fb.png' alt='Facebook' />
        </a>

        <a href='https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://twitter.com/vancityreynolds&ved=2ahUKEwieurOY0vSHAxWQnpUCHUJwL9YQFnoECCEQAQ&usg=AOvVaw0PfnwD1VUMr-chbKLQsSFE'>
          <img className='social' src='/images/tw.png' alt='Twitter' />
        </a>

        <a href='https://www.instagram.com/carlosedu_s.c?igsh=NGx2ZzVwMDhjc2F3'>
          <img className='social' src='/images/ig.png' alt='Instagram' />
        </a>
      </div>

      <img
        className='logoFooter'
        src='/images/logo-branco.png'
        alt='Logo'
        onClick={onClickLogo} 
      />

      <h2>Desenvolvido por <a className='github' href='https://github.com/CarlosEduSC'>CalorsEduSC</a></h2>
    </footer>
  )
}

export default Footer