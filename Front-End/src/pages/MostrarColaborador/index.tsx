import { useParams } from 'react-router-dom'
import './index.css'
import DetalharColaborador from '../../components/DetalharColaborador'
import ListaSuspensa from '../../components/EquipesColaborador'
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
    <div className="mostrar-colaborador">

      <DetalharColaborador colaborador={colaborador}/>

      {/* <ListaSuspensa/> */}
    </div>
  )
}

export default MostrarColaborador