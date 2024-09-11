import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ITime } from "../../shared/interfaces/IEquipe";
import Time from "../../components/Time";
import { buscarTime } from "../../shared/methods/Equipe/BuscarEquipe";

const MostrarTime = () => {
  const [time, setTime] = useState<ITime>()
  const {idTime} = useParams()
  
  const id: bigint = idTime && !isNaN(Number(idTime)) ? BigInt(idTime) : BigInt(0);

  useEffect(() => {
    const fetchTime = async () => {
      const time = await buscarTime(id);
      setTime(time);
    };

    fetchTime();
  }, [id]);

  return (
    <div>
      {time ? (
        <Time
          key={time.id}
          time={time}
          link={false}
          adicionarColaborador={true}
          editar={true}
        />
      ) : (
        <p>Carregando time...</p>
      )}
    </div>
  )
}

export default MostrarTime