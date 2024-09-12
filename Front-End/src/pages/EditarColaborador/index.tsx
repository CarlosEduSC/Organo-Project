import { useParams } from "react-router-dom"
import FormularioCadastroColaborador from "../../components/FormularioColaborador"

const EditarColaborador = () => {
  const {idColaborador} = useParams()

  return (
    <div>
        <FormularioCadastroColaborador idColaborador={idColaborador}/>
    </div>
  )
}

export default EditarColaborador