import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { IEquipe } from "../../shared/interfaces/IEquipe";
import Equipe from "../../components/Equipe";
import { buscarEquipe } from "../../shared/methods/Equipe/BuscarEquipe";

const MostrarEquipe = () => {
  const [equipe, setEquipe] = useState<IEquipe>()
  const {idEquipe} = useParams()

  useEffect(() => {
    const fetchEquipe = async () => {
      const equipe = await buscarEquipe(idEquipe ?? "");
      setEquipe(equipe);
    };

    fetchEquipe();
  }, [idEquipe]);

  return (
    <div>
      {equipe ? (
        <Equipe
          key={equipe.id}
          equipe={equipe}
          link={false}
          adicionarColaboradores={true}
          removerColaborador={true}
          editar={true}
        />
      ) : (
        <p>Carregando equipe...</p>
      )}
    </div>
  )
}

export default MostrarEquipe