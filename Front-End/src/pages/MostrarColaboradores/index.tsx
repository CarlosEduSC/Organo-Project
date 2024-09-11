import { useEffect, useState } from 'react';
import './index.css'
import { IColaborador } from '../../shared/interfaces/IColaborador';
import Colaborador from '../../components/Colaborador';
import { buscarTodosColaboradoresAtivos } from '../../shared/methods/Colaborador/BuscarTodosColaboradoresAtivos';
import { useParams } from 'react-router-dom';

interface MostrarColaboradoresProps {
  adicionar?: boolean
  excluirEditar?: boolean
}

const MostrarColaboradores = ({adicionar, excluirEditar, }: MostrarColaboradoresProps) => {
  const [colaboradores, setColaboradores] = useState<IColaborador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const {idTime} = useParams()

  const id = BigInt(idTime ?? 0)

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
    style={{height: colaboradores.length <= 12 ? "604px" : "auto"}}>
      {loading ? (
        <p>Carregando colaboradores...</p>
      ) : colaboradores.length > 0 ? (
        <div className='colaboradores'>
          {colaboradores.map(colaborador => (
            <Colaborador
              key={colaborador.nome}
              colaborador={colaborador}
              mostrarExcluirEditar={excluirEditar}
              mostrarAdicionar={adicionar}
              idTime={id}
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