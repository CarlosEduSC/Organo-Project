import { useNavigate } from 'react-router-dom'
import { IColaborador } from '../../shared/interfaces/IColaborador'
import './index.css'
import { excluirColaborador } from '../../shared/methods/Colaborador/ExcluirColaborador'
import EquipesColaborador from '../EquipesColaborador'
import { useEffect, useState } from 'react'
import { RemoverColaboradorDeTodasAsEquipes } from '../../shared/methods/ColaboradorEquipe/RemoverColaboradorDeTodasAsEquipes'
import { IEquipe } from '../../shared/interfaces/IEquipe'
import { buscarEquipesDeUmColaborador } from '../../shared/methods/ColaboradorEquipe/BuscarEquipesDeUmColaborador'

interface DetalharColaboradorProps {
  colaborador: IColaborador
}

const DetalharColaborador = ({ colaborador }: DetalharColaboradorProps) => {
  const navigate = useNavigate()

  const [hoveredExcluir, setHoveredExcluir] = useState(false)

  const [hoveredEditar, setHoveredEditar] = useState(false)

  const [equipes, setEquipes] = useState<IEquipe[]>([])

  useEffect(() => {
    const fetchEquipes = async () => {
      const equipes = await buscarEquipesDeUmColaborador(colaborador.id ?? "");
      setEquipes(equipes);
    };

    fetchEquipes();
  }, [equipes, colaborador]);

  const handleClickExcluir = async () => {
    await RemoverColaboradorDeTodasAsEquipes(colaborador.id ?? "")
    await excluirColaborador(colaborador.id ?? "")
    navigate("/colaboradores")
  }

  const handleClickEditar = async () => {
    navigate("/editarColaborador/" + colaborador.id + "?detalhar=true")
  }

  return (
    <div className='detalhar-colaborador' style={{height:equipes.length == 0 ? "604px" : ""}}>
      <div className='cabecalho'>

        <img
          className='excluir'
          src='/images/excluir.png'
          alt='Excluir colaborador'
          onClick={handleClickExcluir}
          onMouseEnter={() => setHoveredExcluir(true)}
          onMouseLeave={() => setHoveredExcluir(false)}
          style={{
            backgroundColor: hoveredExcluir ? "#E10000" : "",
          }}
        />

        <img
          className='editar'
          src='/images/edit.png'
          alt='Editar colaborador'
          onClick={handleClickEditar}
          onMouseEnter={() => setHoveredEditar(true)}
          onMouseLeave={() => setHoveredEditar(false)}
          style={{
            backgroundColor: hoveredEditar ? "#E3E3E3" : "",
          }}
        />

        <img className='foto' src={colaborador.linkFoto} alt={colaborador.nome} />
      </div>

      <div className='rodape'>
        <h3>{colaborador.nome}</h3>

        <p><b>Cargo:</b> {colaborador.cargo}</p>
        <p><b>Telefone:</b> {colaborador.telefone}</p>
        <p><b>Email:</b> {colaborador.email}</p>

        <EquipesColaborador idColaborador={colaborador.id ?? ""} equipes={equipes} />
      </div>
    </div>
  )
}

export default DetalharColaborador