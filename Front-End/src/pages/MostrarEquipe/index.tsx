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
    <div style={{width:"100%"}}>
      {equipe ? (
        <Equipe
          key={equipe.id}
          equipe={equipe}
          link={false}
          adicionarColaboradores={true}
          removerColaborador={true}
          editar={true}
          excluir={true}
        />
      ) : (
        <p>Carregando equipe...</p>
      )}
    </div>
  )
}

export default MostrarEquipe