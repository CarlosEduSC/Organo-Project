import { useNavigate } from 'react-router-dom'
import './index.css'
import { useEffect, useState } from 'react'
import { IUsuario } from '../../shared/interfaces/IUsuario'
import getUserIdFromToken from '../../shared/methods/Usuario/GetUserIdFromToken'
import { buscarUsuario } from '../../shared/methods/Usuario/BuscarUsuario'

const DetalharUsuario = () => {
  const [usuario, setUsuario] = useState<IUsuario>()
  const [id, setId] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = getUserIdFromToken(token);
      setId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchUsuario = async () => {
      const usuario = await buscarUsuario(id ?? "");
      setUsuario(usuario);
    };

    if (id) {
      fetchUsuario();
    }

  }, [id]);

  const [hoveredEditar, setHoveredEditar] = useState(false)

  const handleClickEditar = async () => {
    navigate("/editarUsuario/" + id)
  }
  
  return (
    <div className='detalhar-usuario' >

      <img
        className='editar'
        src='/images/edit.png'
        alt='Editar usuario'
        onClick={handleClickEditar}
        onMouseEnter={() => setHoveredEditar(true)}
        onMouseLeave={() => setHoveredEditar(false)}
        style={{
          backgroundColor: hoveredEditar ? "#E3E3E3" : "",
        }} />

      <h3>{usuario?.nome}</h3>

      <p><b>Email: </b>{usuario?.email}</p>
    </div>
  )
}

export default DetalharUsuario