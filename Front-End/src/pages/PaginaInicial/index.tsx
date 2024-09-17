import './index.css'
import Banner from '../../components/Banner'
import { useEffect, useState } from 'react';
import { IEquipe } from '../../shared/interfaces/IEquipe';
import { IColaborador } from '../../shared/interfaces/IColaborador';
import Equipe from '../../components/Equipe';
import { buscarTodosColaboradoresAtivos } from '../../shared/methods/Colaborador/BuscarTodosColaboradoresAtivos';
import { buscarTodasEquipesAtivas } from '../../shared/methods/Equipe/BuscarTodasEquipesAtivas';

const PaginaInicial = () => {
  const [equipes, setEquipes] = useState<IEquipe[]>([]);

  useEffect(() => {
    const fetchEquipes = async () => {
      const equipes = await buscarTodasEquipesAtivas();
      setEquipes(equipes);
    };

    fetchEquipes();
  }, []);

  return (
    <section className='paginaInicial'>

      <Banner src='/images/banner.png' alt='Banner da pagina inicial.' />

      {equipes.length != 0 ? equipes.map(equipe => <Equipe
        key={equipe.id}
        equipe={equipe}
        link={true}
      />) : <h1 className='mensagem'>Você ainda não possui equipes!</h1>}
    </section>
  )
}

export default PaginaInicial