import { useEffect, useState } from 'react'
import './index.css'
import { IEquipe } from '../../shared/interfaces/IEquipe'
import { buscarEquipesDeUmColaborador } from '../../shared/methods/ColaboradorEquipe/BuscarEquipesDeUmColaborador'
import { useNavigate } from 'react-router-dom'

interface EquipesColaboradorProps {
  idColaborador: string
  equipes: IEquipe[]
}

const EquipesColaborador = ({ idColaborador, equipes }: EquipesColaboradorProps) => {
  const navigate = useNavigate()

  const handleEquipeClick = (idTime: string) => {
    navigate("/equipe/" + idTime)
  }

  return (
    <div className='equipes-colaborador'>

      <h4 className={equipes.length != 0 ? "com-equipe" : "sem-equipe"}>{equipes.length != 0 ? "Equipes que o colaborador participa" : "O colaborador não participa de nenhuma equipe!"}</h4>

      {equipes.length != 0 ? equipes.map(equipe =>
        <div className='mostrar-equipe' style={{ backgroundColor: equipe.corSecundaria }} onClick={() => handleEquipeClick(equipe.id ?? "")}>
          <h3 style={{ color: equipe.corPrimaria }}>
            <span className='bottomBar' style={{ color: equipe.corPrimaria }}></span>

            {equipe.nome}
          </h3>
        </div>)

        : <></>}
    </div>
  )
}

export default EquipesColaborador