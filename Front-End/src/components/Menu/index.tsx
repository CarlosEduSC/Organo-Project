import { useEffect, useRef, useState } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
  const [isActive, setIsActive] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()



  const CadastroColaboradorClick = () => {
    navigate('/cadastrarColaborador')
  }

  const PaginaInicialClick = () => {
    navigate("/")
  }

  const CadastroTime = () => {
    navigate("/cadastrarTime")
  }

  const menuClick = () => {
    setIsActive(!isActive)
  }


  const Colaboradores = () => {
    navigate("/colaboradores")
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
        <img className='menu-image' src='https://cdn.icon-icons.com/icons2/930/PNG/512/menu_icon-icons.com_72311.png' alt='Menu' onClick={menuClick}/>

        {isActive && (
          <div className="menu-options" aria-labelledby="dropdownMenuLink">
            <a className="menu-item" onClick={PaginaInicialClick}>Pagina Inicial</a>
            <a className="menu-item" onClick={CadastroColaboradorClick}>Cadastrar colaborador</a>
            <a className='menu-item' onClick={CadastroTime}>Cadastrar time</a>
            <a className='menu-item' onClick={Colaboradores}>Colaboradores</a>
          </div>
        )}
      </div>
    </>
  )
}

export default Menu