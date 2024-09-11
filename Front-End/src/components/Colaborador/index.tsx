import { useNavigate } from 'react-router-dom'
import { excluirColaborador } from '../../shared/methods/Colaborador/ExcluirColaborador'
import './index.css'
import { IColaborador } from '../../shared/interfaces/IColaborador'

interface ColaboradorProps {
  colaborador: IColaborador
  corPrimaria?: string
  mostrarExcluirEditar?: boolean
}

const Colaborador = ({ colaborador, corPrimaria = "#6278f7", mostrarExcluirEditar = false }: ColaboradorProps) => {

  const navigate = useNavigate()

  const handleClickExcluir = async () => {
    await excluirColaborador(colaborador.id ?? BigInt(0))
  }

  const handleClickEditar = async () => {
    navigate("/editarColaborador/" + colaborador.id)
  }

  const handleClickPerfil = async () => {
    navigate("/perfilColaborador/" + colaborador.id)
  }

  return (
    <div className='colaborador'>
      <div className='cabecalho' style={{ backgroundColor: corPrimaria }}>
        {mostrarExcluirEditar &&
          <>
            <img
              className='excluir'
              src='/images/excluir.png'
              alt='Excluir colaborador'
              onClick={handleClickExcluir}
            />

            <img
              className='editar'
              src='/images/edit.png'
              alt='Editar colaborador'
              onClick={handleClickEditar}
            />
          </>
        }

        <img className='foto' src={colaborador.linkFoto} alt={colaborador.nome} onClick={handleClickPerfil}/>
      </div>

      <div className='rodape'>
        <h4 style={{ color: corPrimaria }} onClick={handleClickPerfil}>{colaborador.nome}</h4>
        <h5>{colaborador.cargo}</h5>
      </div>
    </div>
  )
}

export default Colaborador