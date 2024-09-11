import { IColaborador } from '../../shared/interfaces/IColaborador'
import Colaborador from '../Colaborador'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface TimeProps {
  nome: string
  corPrimaria: string
  corSecundaria: string
  colaboradores?: IColaborador[]
  link?: boolean
  mostrarRemoverColaborador?: boolean
}

const Time = ({ nome, corPrimaria, corSecundaria, colaboradores = [], link = true , mostrarRemoverColaborador = false}: TimeProps) => {

  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate("/mostrarTime/" + nome)
  }

  const [addHovered, setAddHovered] = useState(false);

  if (link) {
    return (
      <section className='time' style={{ backgroundColor: corSecundaria }}>
        <img
          className='add-colaborador'
          src='/images/edit.png'
          onMouseEnter={() => setAddHovered(true)}
          onMouseLeave={() => setAddHovered(false)}
          style={{ backgroundColor: addHovered ? corPrimaria : '' }}
          onClick={handleEditClick}
        />

        <h3 style={{ color: corPrimaria, cursor: "pointer" }} onClick={handleEditClick}>
          <span className='bottomBar' style={{ color: corPrimaria }}></span>

          {nome}
        </h3>
        <div className='colaboradores'>
          {colaboradores.map(colaborador => <Colaborador
            key={colaborador.nome}
            corPrimaria={corPrimaria}
            colaborador={colaborador}
          />)}
        </div>
      </section>
    )

  } else {
    return (
      <section className='time' style={{ backgroundColor: corSecundaria }}>
        <h3 style={{ color: corPrimaria }}>
          <span className='bottomBar' style={{ color: corPrimaria }}></span>

          {nome}
        </h3>
        <div className='colaboradores'>
          {colaboradores.map(colaborador => <Colaborador
            key={colaborador.nome}
            corPrimaria={corPrimaria}
            colaborador={colaborador}
            mostrarExcluirEditar={mostrarRemoverColaborador}
          />)}
        </div>
      </section>
    )
  }
}

export default Time