import { useEffect, useRef, useState } from 'react'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Menu = () => {
  const [isActive, setIsActive] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  const location = useLocation();

  const CadastroColaboradorClick = () => {
    navigate('/cadastrarColaborador')
  }

  const PaginaInicialClick = () => {
    navigate("/")
  }

  const CadastroEquipe = () => {
    navigate("/cadastrarEquipe")
  }

  const menuClick = () => {
    setIsActive(!isActive)
  }

  const cadastrarClick = () => {
    navigate("/cadastro")
  }

  const loginClick = () => {
    navigate("/login")
  }

  const Colaboradores = () => {
    navigate("/colaboradores")
  }

  const Perfil = () => {
    navigate("/perfil")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }

    if (isActive) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isActive])

  return (
    <>
      <div className="menu" ref={menuRef}>
        {location.pathname != "/login" && location.pathname != "/cadastro" ?
          <>
            <img className='menu-image' src='https://cdn.icon-icons.com/icons2/930/PNG/512/menu_icon-icons.com_72311.png' alt='Menu' onClick={menuClick} />

            {isActive && <div className="menu-options" aria-labelledby="dropdownMenuLink">
              {location.pathname != "/perfil" && location.pathname != "/login" && location.pathname != "/cadastro" ? <a className='menu-item' onClick={Perfil}>Perfil</a> : <></>}
              {location.pathname != "/" && location.pathname != "/login" && location.pathname != "/cadastro" ? <a className="menu-item" onClick={PaginaInicialClick}>Pagina Inicial</a> : <></>}
              {location.pathname != "/cadastrarColaborador" && location.pathname != "/login" && location.pathname != "/cadastro" ? <a className="menu-item" onClick={CadastroColaboradorClick}>Cadastrar colaborador</a> : <></>}
              {location.pathname != "/cadastrarEquipe" && location.pathname != "/login" && location.pathname != "/cadastro" ? <a className='menu-item' onClick={CadastroEquipe}>Cadastrar equipe</a> : <></>}
              {location.pathname != "/colaboradores" && location.pathname != "/login" && location.pathname != "/cadastro" ? <a className='menu-item' onClick={Colaboradores}>Colaboradores</a> : <></>}
            </div>}
          </> :

          <>
            {location.pathname == "/login" ? <div className='cadastrar-login' onClick={cadastrarClick}>Cadastrar-se</div>

              : <div className='cadastrar-login' onClick={loginClick}>Entrar</div>}
          </>}

      </div>
    </>
  )
}

export default Menu