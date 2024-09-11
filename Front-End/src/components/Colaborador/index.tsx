import { useNavigate } from 'react-router-dom'
import { excluirColaborador } from '../../shared/methods/Colaborador/ExcluirColaborador'
import './index.css'
import { IColaborador } from '../../shared/interfaces/IColaborador'
import { useEffect, useState } from 'react'
import { adicionarColaboradorAoTime } from '../../shared/methods/ColaboradorEquipe/AdicionarColaboradorAEquipe'

interface ColaboradorProps {
  colaborador: IColaborador
  corPrimaria?: string
  mostrarExcluirEditar?: boolean
  mostrarAdicionar?: boolean
  idTime?: bigint
}

const Colaborador = ({ colaborador, corPrimaria = "#6278f7", mostrarExcluirEditar = false, mostrarAdicionar = false, idTime = BigInt(0) }: ColaboradorProps) => {

  const navigate = useNavigate()

  const [adicionar, setAdicionar] = useState(false)

  useEffect(() => {
    const handleColaborador = async () => {
      const colaboradorTime: IColaboradorTime = {
        idColaborador: colaborador.id.toString(),
        idTime: idTime.toString()
      }

      await adicionarColaboradorAoTime(colaboradorTime);

      navigate("/mostrarTime/" + idTime)
    };

    if (adicionar) {
      handleColaborador();
    }
  }, [adicionar, navigate]);

  const handleClickExcluir = async () => {
    await excluirColaborador(colaborador.id ?? BigInt(0))
  }

  const handleClickEditar = async () => {
    navigate("/editarColaborador/" + colaborador.id)
  }

  const handleClickPerfil = async () => {
    navigate("/perfilColaborador/" + colaborador.id)
  }

  const handleClickAdd = async () => {
    setAdicionar(true)
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

        {mostrarAdicionar &&
          <img
            className='adicionar'
            src='/images/add.png'
            alt='Excluir colaborador'
            onClick={handleClickAdd}
          />
        }

        <img className='foto' src={colaborador.linkFoto} alt={colaborador.nome} onClick={handleClickPerfil} />
      </div>

      <div className='rodape'>
        <h4 style={{ color: corPrimaria }} onClick={handleClickPerfil}>{colaborador.nome}</h4>
        <h5>{colaborador.cargo}</h5>
      </div>
    </div>
  )
}

export default Colaborador