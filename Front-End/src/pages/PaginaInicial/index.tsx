import './index.css'
import Banner from '../../components/Banner'
import { useEffect, useState } from 'react';
import { ITime } from '../../shared/interfaces/IEquipe';
import { IColaborador } from '../../shared/interfaces/IColaborador';
import { buscarTimes } from '../../shared/methods/Equipe/BuscarTodasEquipes';
import Time from '../../components/Time';
import { buscarTodosColaboradoresAtivos } from '../../shared/methods/Colaborador/BuscarTodosColaboradoresAtivos';

const PaginaInicial = () => {
  const [times, setTimes] = useState<ITime[]>([]);

  useEffect(() => {
    const fetchTimes = async () => {
      const times = await buscarTimes();
      setTimes(times);
    };

    fetchTimes();
  }, []);

  return (
    <section className='paginaInicial'>

      <Banner src='/images/banner.png' alt='Banner da pagina inicial.' />

      {times.map(time => <Time
        key={time.id}
        time={time}
        mostrarRemoverColaborador={false}
      />)}
    </section>
  )
}

export default PaginaInicial