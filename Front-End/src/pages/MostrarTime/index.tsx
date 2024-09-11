import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ITime } from "../../shared/interfaces/ITime";
import { buscarTimePeloNome } from "../../shared/methods/Time/BuscarTimePeloNome";
import Time from "../../components/Time";
import Banner from "../../components/Banner";

const MostrarTime = () => {
  const [time, setTime] = useState<ITime>()
  const {nomeTime} = useParams()

  useEffect(() => {
    const fetchTime = async () => {
      const time = await buscarTimePeloNome(nomeTime ?? "");
      setTime(time);
    };

    fetchTime();
  }, [nomeTime]);

  console.log(nomeTime)

  return (
    <div>
      {time ? (
        <Time
          key={time.id}
          nome={time.nome}
          corPrimaria={time.corPrimaria}
          corSecundaria={time.corSecundaria}
          link={false}
        />
      ) : (
        <p>Carregando time...</p>
      )}
    </div>
  )
}

export default MostrarTime