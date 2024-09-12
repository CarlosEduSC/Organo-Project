import { useNavigate } from 'react-router-dom'
import { IColaborador } from '../../shared/interfaces/IColaborador'
import './index.css'
import { excluirColaborador } from '../../shared/methods/Colaborador/ExcluirColaborador'
import EquipesColaborador from '../EquipesColaborador'

interface DetalharColaboradorProps {
  colaborador: IColaborador
}

const DetalharColaborador = ({ colaborador }: DetalharColaboradorProps) => {
  const navigate = useNavigate()

  const handleClickExcluir = async () => {
    await excluirColaborador(colaborador.id ?? "")
    navigate("/colaboradores")
  }

  const handleClickEditar = async () => {
    navigate("/editarColaborador/" + colaborador.id + "?detalhar=true")
  }

  const handleClickEquipe = async () => {
    navigate("/mostrarEquipe/" + colaborador.id)
  }

  return (
    <div className='detalhar-colaborador'>
      <div className='cabecalho'>

        <img
          className='excluir'
          src='/images/excluir.png'
          alt='Excluir colaborador'
          onClick={handleClickExcluir}
        />

        <img
          className='editar'
          src='/images/edit.png'
          alt='Editar colaborador'
          onClick={handleClickEditar}
        />

        <img className='foto' src={colaborador.linkFoto} alt={colaborador.nome} />
      </div>

      <div className='rodape'>
        <h3>{colaborador.nome}</h3>

        <p><b>Cargo:</b> {colaborador.cargo}</p>
        <p><b>Telefone:</b> {colaborador.telefone}</p>
        <p><b>Email:</b> {colaborador.email}</p>

        <EquipesColaborador idColaborador={colaborador.id ?? ""} />
      </div>
    </div>
  )
}

export default DetalharColaborador