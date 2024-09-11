import { useParams } from "react-router-dom"
import FormularioCadastroColaborador from "../../components/FormularioColaborador"

const EditarColaborador = () => {
  const {idColaborador} = useParams()

  const id = BigInt(idColaborador ?? 0)

  return (
    <div>
        <FormularioCadastroColaborador idColaborador={id}/>
    </div>
  )
}

export default EditarColaborador