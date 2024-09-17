import { useEffect, useState } from 'react';
import MostrarColaboradores from '../MostrarColaboradores'
import './index.css'
import { IEquipe } from '../../shared/interfaces/IEquipe';
import { buscarTodasEquipesAtivas } from '../../shared/methods/Equipe/BuscarTodasEquipesAtivas';
import Equipe from '../../components/Equipe';
import DetalharUsuario from '../../components/DetalharUsuario';

const Perfil = () => {
  const [equipes, setEquipes] = useState<IEquipe[]>([]);

  useEffect(() => {
    const fetchEquipes = async () => {
      const equipes = await buscarTodasEquipesAtivas();
      setEquipes(equipes);
    };

    fetchEquipes();
  }, []);

  return (
    <div className="perfil">
      <DetalharUsuario/>

      <MostrarColaboradores />

      {equipes.length != 0 ? equipes.map(equipe => <Equipe
        key={equipe.id}
        equipe={equipe}
      />) : <h1 className='mensagem'>Você ainda não possui equipes!</h1>}
    </div>
  )
}

export default Perfil