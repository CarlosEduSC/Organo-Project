import { IColaborador } from '../../shared/interfaces/IColaborador'
import Colaborador from '../Colaborador'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ITime } from '../../shared/interfaces/IEquipe'

interface TimeProps {
  time: ITime
  colaboradoresPadrao?: IColaborador[]
  link?: boolean
  mostrarRemoverColaborador?: boolean
  adicionarColaborador?: boolean
  editar?: boolean
}

const Time = ({ time, colaboradoresPadrao = [], link = true, mostrarRemoverColaborador = false, adicionarColaborador = false, editar = false }: TimeProps) => {

  const [colaboradores, setColaboradores] = useState<IColaborador[]>([]);

  const navigate = useNavigate()

  const [hovered, setHovered] = useState(false);

  const handleEditClick = () => {
    navigate("/mostrarTime/" + time.id)
  }

  const handleAddClick = () => {
    navigate("/adicionarColaborador/" + time.id)
  }

  useEffect(() => {
    const fetchColaboradores = async () => {
      const colaboradores = await buscarTodosColaboradoresAtivos();
      setColaboradores(colaboradores);
    };

    fetchColaboradores();

  }, []);

  return (
    <section className='time' style={{ backgroundColor: time.corSecundaria, height: editar ? "604px" : ""}}>
      {link ? <img
        className='edit-time'
        src='/images/edit.png'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ backgroundColor: hovered ? time.corPrimaria : '' }}
        onClick={handleEditClick}
      /> : <></>}

      {adicionarColaborador ? <img
        className='add-colaborador'
        src='/images/add.png'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          backgroundColor: hovered ? time.corPrimaria : '',
          height: "30px",
          width: "30px"
        }}
        onClick={handleAddClick}
      /> : <></>}

      <h3 style={{ color: time.corPrimaria, cursor: link ? "pointer" : "" }} onClick={handleEditClick}>
        <span className='bottomBar' style={{ color: time.corPrimaria }}></span>

        {time.nome}
      </h3>
      <div className='colaboradores'>
        {colaboradoresPadrao.length == 0 ? colaboradoresPadrao.map(colaborador => <Colaborador
          key={colaborador.nome}
          corPrimaria={time.corPrimaria}
          colaborador={colaborador}
        />) : colaboradores.map(colaborador => <Colaborador
          key={colaborador.nome}
          corPrimaria={time.corPrimaria}
          colaborador={colaborador}
        />)}
      </div>
    </section>
  )
}

export default Time