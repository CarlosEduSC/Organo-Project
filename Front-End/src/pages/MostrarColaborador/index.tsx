import { useParams } from 'react-router-dom'
import DetalharColaborador from '../../components/DetalharColaborador'
import { useEffect, useState } from 'react'
import { buscarColaborador } from '../../shared/methods/Colaborador/BuscarColaborador'
import { IColaborador } from '../../shared/interfaces/IColaborador'

const MostrarColaborador = () => {
  const {idColaborador} = useParams()

  const [colaborador, setColaborador] = useState<IColaborador>({nome:"", cargo:"", telefone:"", email:"", linkFoto:""})

  useEffect(() => {
    const fetchColaborador = async () => {
      const colaborador = await buscarColaborador(idColaborador ?? "");
      setColaborador(colaborador);
    };

    if (idColaborador) {
      fetchColaborador();
    }

  }, [idColaborador]);

  return (
    <div style={{width:"100%"}}>
      <DetalharColaborador colaborador={colaborador}/>
    </div>
  )
}

export default MostrarColaborador