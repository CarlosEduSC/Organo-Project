import { useNavigate } from 'react-router-dom'
import { excluirColaborador } from '../../shared/methods/Colaborador/ExcluirColaborador'
import './index.css'
import { IColaborador } from '../../shared/interfaces/IColaborador'
import { useEffect, useState } from 'react'
import { adicionarColaboradorAEquipe } from '../../shared/methods/ColaboradorEquipe/AdicionarColaboradorAEquipe'
import { removerColaboradorDaEquipe } from '../../shared/methods/ColaboradorEquipe/RemoverColaboradorDaEquipe'
import { RemoverColaboradorDeTodasAsEquipes } from '../../shared/methods/ColaboradorEquipe/RemoverColaboradorDeTodasAsEquipes'

interface ColaboradorProps {
  colaborador: IColaborador
  corPrimaria?: string
  corSecundaria?: string
  mostrarExcluirEditar?: boolean
  mostrarAdicionar?: boolean
  mostrarRemoverDaEquipe?: boolean
  idEquipe?: string
}

const Colaborador = ({ colaborador, corPrimaria = "#6278f7", corSecundaria = "#E5E5E5", mostrarExcluirEditar = false, mostrarAdicionar = false, mostrarRemoverDaEquipe = false, idEquipe = "" }: ColaboradorProps) => {

  const navigate = useNavigate()

  const [adicionar, setAdicionar] = useState(false)

  const [hoveredExcluir, setHoveredExcluir] = useState(false)

  const [hoveredEditarRemoverAdd, setHoveredEditarRemoverAdd] = useState(false)

  useEffect(() => {
    const handleColaborador = async () => {
      const colaboradorEquipe: IColaboradorEquipe = {
        idColaborador: colaborador.id ?? "",
        idEquipe: idEquipe.toString()
      }

      await adicionarColaboradorAEquipe(colaboradorEquipe);

      navigate("/equipe/" + idEquipe)
    };

    if (adicionar) {
      handleColaborador();
    }
  }, [adicionar, navigate]);

  const handleClickExcluir = async () => {
    await RemoverColaboradorDeTodasAsEquipes(colaborador.id ?? "")
    await excluirColaborador(colaborador.id ?? "")
  }

  const handleClickEditar = async () => {
    navigate("/editarColaborador/" + colaborador.id)
  }

  const handleClickPerfil = async () => {
    navigate("/colaborador/" + colaborador.id)
  }

  const handleClickAdd = async () => {
    setAdicionar(true)
  }

  const handleClickRemover = async () => {
    if (idEquipe) {
      const colaboradorEquipe: IColaboradorEquipe = { idColaborador: colaborador.id ?? "", idEquipe: idEquipe }

      await removerColaboradorDaEquipe(colaboradorEquipe)
    }
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
              onMouseEnter={() => setHoveredExcluir(true)}
              onMouseLeave={() => setHoveredExcluir(false)}
              style={{
                backgroundColor: hoveredExcluir ? "#E10000" : "",
              }}
            />

            <img
              className='editar'
              src='/images/edit.png'
              alt='Editar colaborador'
              onClick={handleClickEditar}
              onMouseEnter={() => setHoveredEditarRemoverAdd(true)}
              onMouseLeave={() => setHoveredEditarRemoverAdd(false)}
              style={{
                backgroundColor: hoveredEditarRemoverAdd ? corSecundaria : "",
              }}
            />
          </>
        }

        {mostrarAdicionar &&
          <img
            className='adicionar'
            src='/images/add.png'
            alt='Adicionar colaborador a equipe'
            onClick={handleClickAdd}
            onMouseEnter={() => setHoveredEditarRemoverAdd(true)}
            onMouseLeave={() => setHoveredEditarRemoverAdd(false)}
            style={{
              backgroundColor: hoveredEditarRemoverAdd ? corSecundaria : "",
            }}
          />
        }

        {mostrarRemoverDaEquipe &&
          <img
            className='remover'
            src='/images/remover.png'
            alt='Remover o colaborador da equipe'
            onClick={handleClickRemover}
            onMouseEnter={() => setHoveredEditarRemoverAdd(true)}
            onMouseLeave={() => setHoveredEditarRemoverAdd(false)}
            style={{
              backgroundColor: hoveredEditarRemoverAdd ? "#E10000" : "",
            }}
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