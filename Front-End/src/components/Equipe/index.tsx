import { IColaborador } from '../../shared/interfaces/IColaborador'
import Colaborador from '../Colaborador'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IEquipe } from '../../shared/interfaces/IEquipe'
import { buscarTodosColaboradoresAtivos } from '../../shared/methods/Colaborador/BuscarTodosColaboradoresAtivos'
import { buscarColaboradoresDaEquipe } from '../../shared/methods/ColaboradorEquipe/BuscarColaboradoresDaEquipe'
import { buscarColaborador } from '../../shared/methods/Colaborador/BuscarColaborador'

interface EquipeProps {
  equipe: IEquipe
  colaboradoresPadrao?: IColaborador[]
  link?: boolean
  mostrarRemoverColaborador?: boolean
  adicionarColaboradores?: boolean
  removerColaborador?: boolean
  editar?: boolean
}

const Equipe = ({ equipe, colaboradoresPadrao = [], link = true, mostrarRemoverColaborador = false, adicionarColaboradores = false, removerColaborador = false, editar = false }: EquipeProps) => {

  const [colaboradores, setColaboradores] = useState<IColaborador[]>([]);

  const navigate = useNavigate()

  const [hovered, setHovered] = useState(false);

  const handleEditClick = () => {
    navigate("/equipe/" + equipe.id)
  }

  const handleAddClick = () => {
    navigate("/adicionarColaborador/" + equipe.id)
  }

  useEffect(() => {
    const fetchColaboradores = async () => {
      const colaboradores = await buscarColaboradoresDaEquipe(equipe.id ?? "");
      setColaboradores(colaboradores);
    };

    if (equipe.id) {
      fetchColaboradores();
    }

  }, [colaboradores,equipe]);

  return (
    <section className='equipe' style={{ backgroundColor: equipe.corSecundaria, height: editar ? "604px" : ""}}>
      {link ? <img
        className='edit-equipe'
        src='/images/edit.png'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ backgroundColor: hovered ? equipe.corPrimaria : '' }}
        onClick={handleEditClick}
      /> : <></>}

      {adicionarColaboradores ? <img
        className='add-colaborador'
        src='/images/add.png'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          backgroundColor: hovered ? equipe.corPrimaria : '',
          height: "30px",
          width: "30px"
        }}
        onClick={handleAddClick}
      /> : <></>}

      <h3 style={{ color: equipe.corPrimaria, cursor: link ? "pointer" : "" }} onClick={handleEditClick}>
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