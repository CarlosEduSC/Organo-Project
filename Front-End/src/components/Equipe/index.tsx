import { IColaborador } from '../../shared/interfaces/IColaborador'
import Colaborador from '../Colaborador'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IEquipe } from '../../shared/interfaces/IEquipe'
import { buscarColaboradoresDaEquipe } from '../../shared/methods/ColaboradorEquipe/BuscarColaboradoresDaEquipe'
import { excluirEquipe } from '../../shared/methods/Equipe/ExcluirEquipe'
import { removerTodosOsColaboradoresDaEquipe } from '../../shared/methods/ColaboradorEquipe/RemoverTodosOsColaboradoresDaEquipe'

interface EquipeProps {
  equipe: IEquipe
  colaboradoresPadrao?: IColaborador[]
  link?: boolean
  adicionarColaboradores?: boolean
  removerColaborador?: boolean
  editar?: boolean
  excluir?: boolean
}

const Equipe = ({ equipe, colaboradoresPadrao = [], link = false, adicionarColaboradores = false, removerColaborador = false, editar = false, excluir = false }: EquipeProps) => {

  const [colaboradores, setColaboradores] = useState<IColaborador[]>([]);

  const navigate = useNavigate()

  const [hoveredAdd, setHoveredAdd] = useState(false);

  const [hoveredEdit, setHoveredEdit] = useState(false);

  const [hoveredExcluir, setHoveredExcluir] = useState(false);

  const handleEditClick = () => {
    navigate("/editarEquipe/" + equipe.id)
  }

  const handleLinkClick = () => {
    navigate("/equipe/" + equipe.id)
  }

  const handleAddClick = () => {
    navigate("/adicionarColaborador/" + equipe.id)
  }

  const handleExcluirClick = async () => {
    await removerTodosOsColaboradoresDaEquipe(equipe.id ?? "")

    await excluirEquipe(equipe.id ?? "")

    navigate("/")
  }

  useEffect(() => {
    const fetchColaboradores = async () => {
      const colaboradores = await buscarColaboradoresDaEquipe(equipe.id ?? "");
      setColaboradores(colaboradores);
    };

    if (equipe.id) {
      fetchColaboradores();
    }

  }, [colaboradores, equipe]);

  return (
    <section className='equipe' style={{ backgroundColor: equipe.corSecundaria , height: colaboradores.length <= 6 ? editar ? "668px" : "auto" : "auto" }}>
      {editar ? <img
        className='edit-equipe'
        src='/images/edit.png'
        onMouseEnter={() => setHoveredEdit(true)}
        onMouseLeave={() => setHoveredEdit(false)}
        style={{ backgroundColor: hoveredEdit ? equipe.corPrimaria : '' }}
        onClick={handleEditClick}
      /> : <></>}

      {adicionarColaboradores ? <img
        className='add-colaborador'
        src='/images/add.png'
        onMouseEnter={() => setHoveredAdd(true)}
        onMouseLeave={() => setHoveredAdd(false)}
        style={{
          backgroundColor: hoveredAdd ? equipe.corPrimaria : ''
        }}
        onClick={handleAddClick}
      /> : <></>}

      {excluir ? <img
        className='excluir'
        src='/images/excluir.png'
        onMouseEnter={() => setHoveredExcluir(true)}
        onMouseLeave={() => setHoveredExcluir(false)}
        style={{
          backgroundColor: hoveredExcluir ? "#E10000" : "",
        }}
        onClick={handleExcluirClick}
      /> : <></>}

      <h3 style={{ color: equipe.corPrimaria, cursor: link ? "pointer" : "" }} onClick={handleLinkClick}>
        <span className='bottomBar' style={{ color: equipe.corPrimaria }}></span>

        {equipe.nome}
      </h3>
      <div className='colaboradores'>
        {colaboradoresPadrao.length != 0 ? colaboradoresPadrao.map(colaborador => <Colaborador
          key={colaborador.nome}
          corPrimaria={equipe.corPrimaria}
          colaborador={colaborador}
        />) : colaboradores.map(colaborador => <Colaborador
          key={colaborador.nome}
          corPrimaria={equipe.corPrimaria}
          colaborador={colaborador}
          mostrarRemoverDaEquipe={removerColaborador}
          idEquipe={removerColaborador ? equipe.id : ""}
        />)}
      </div>
    </section>
  )
}

export default Equipe