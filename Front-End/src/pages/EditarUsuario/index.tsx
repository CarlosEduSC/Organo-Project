import { useParams } from "react-router-dom"
import FormularioUsuario from "../../components/FormularioUsuario"

const EditarUsuario = () => {
  const {idUsuario} = useParams()
  return (
    <div style={{width: "100%"}}>
        <FormularioUsuario editar={true} idUsuario={idUsuario}/>
    </div>
  )
}

export default EditarUsuario