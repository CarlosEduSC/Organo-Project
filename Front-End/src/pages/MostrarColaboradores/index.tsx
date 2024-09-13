import { useEffect, useState } from 'react';
import './index.css'
import { IColaborador } from '../../shared/interfaces/IColaborador';
import Colaborador from '../../components/Colaborador';
import { buscarTodosColaboradoresAtivos } from '../../shared/methods/Colaborador/BuscarTodosColaboradoresAtivos';
import { useParams } from 'react-router-dom';
import { IEquipe } from '../../shared/interfaces/IEquipe';
import { buscarEquipe } from '../../shared/methods/Equipe/BuscarEquipe';

interface MostrarColaboradoresProps {
  adicionar?: boolean
  excluirEditar?: boolean
}

const MostrarColaboradores = ({ adicionar, excluirEditar }: MostrarColaboradoresProps) => {
  const [colaboradores, setColaboradores] = useState<IColaborador[]>([]);
  const [equipe, setEquipe] = useState<IEquipe>()
  const [loading, setLoading] = useState<boolean>(true);

  const { idEquipe } = useParams()

  useEffect(() => {
    const fetchEquipe = async () => {

      const equipe = await buscarEquipe(idEquipe ?? "");
      setEquipe(equipe);

    };

    if (idEquipe) {
      fetchEquipe();
    }

  }, [idEquipe]);

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const colaboradores = await buscarTodosColaboradoresAtivos();
        setColaboradores(colaboradores);
      } catch (error) {
        console.error('Erro ao buscar colaboradores', error);
      } finally {
        setLoading(false);
      }
    };

    fetchColaboradores();

  }, [colaboradores]);

  return (
    <div
      className={colaboradores.length > 0 ? "mostrar-colaboradores" : "sem-colaboradores"}
      style={{ height: colaboradores.length <= 6 ? "604px" : "auto" , backgroundColor: idEquipe ? equipe?.corSecundaria : ""}}>
      {loading ? (
        <p>Carregando colaboradores...</p>
      ) : colaboradores.length > 0 ? (
        <div className='colaboradores'>
          {idEquipe ? <h1 style={{color: idEquipe ? equipe?.corPrimaria : ""}}>Selecione um colaborador</h1> : <></>}
          {colaboradores.map(colaborador => (
            <Colaborador
              key={colaborador.nome}
              colaborador={colaborador}
              mostrarExcluirEditar={excluirEditar}
              mostrarAdicionar={adicionar}
              idEquipe={idEquipe}
              corPrimaria={idEquipe ? equipe?.corPrimaria : undefined}
              corSecundaria={idEquipe ? equipe?.corSecundaria : undefined}
            />
          ))}
        </div>
      ) : (
        <h1>Nenhum colaborador cadastrado.</h1>
      )}
    </div>
  )
}

export default MostrarColaboradores