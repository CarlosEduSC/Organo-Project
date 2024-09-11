import './index.css'
import Banner from '../../components/Banner'
import { useEffect, useState } from 'react';
import { ITime } from '../../shared/interfaces/ITime';
import { IColaborador } from '../../shared/interfaces/IColaborador';
import { buscarTimes } from '../../shared/methods/Time/BuscarTimes';
import Time from '../../components/Time';
import { buscarTodosColaboradoresAtivos } from '../../shared/methods/Colaborador/BuscarTodosColaboradoresAtivos';

const PaginaInicial = () => {
  const [times, setTimes] = useState<ITime[]>([]);
  const [colaboradores, setColaboradores] = useState<IColaborador[]>([]);

  useEffect(() => {
    const fetchTimes = async () => {
      const times = await buscarTimes();
      setTimes(times);
    };

    fetchTimes();
  }, []);

  useEffect(() => {
    const fetchColaboradores = async () => {
      const colaboradores = await buscarTodosColaboradoresAtivos();
      setColaboradores(colaboradores);
    };

    fetchColaboradores();

  }, []);

  return (
    <section className='paginaInicial'>

      <Banner src='/images/banner.png' alt='Banner da pagina inicial.' />

      {times.map(time => <Time
        key={time.id}
        nome={time.nome}
        corPrimaria={time.corPrimaria}
        corSecundaria={time.corSecundaria}
        colaboradores={colaboradores}
        mostrarRemoverColaborador={false}
      />)}
    </section>
  )
}

export default PaginaInicial