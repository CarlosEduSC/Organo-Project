import { useParams } from "react-router-dom"
import FormularioEquipe from "../../components/FormularioEquipe"

const EditarEquipe = () => {
  const {idEquipe} = useParams()

  return (
    <div style={{width: "100%"}}>
        <FormularioEquipe editar={true} idEquipe={idEquipe}/>
    </div>
  )
}

export default EditarEquipe