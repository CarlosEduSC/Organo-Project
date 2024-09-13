import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Botao from "../Botao"
import CampoTexto from "../CampoTexto"
import "./index.css"
import { IUsuario } from "../../shared/interfaces/IUsuario";
import { cadastrarUsuario } from "../../shared/methods/Usuario/CadastrarUsuario";
import { buscarUsuario } from "../../shared/methods/Usuario/BuscarUsuario";
import { editarUsuario } from "../../shared/methods/Usuario/EditarUsuario";

interface FormularioUsuarioProps {
  editar?: boolean
  cadastrar?: boolean
  idUsuario?: string
}

const FormularioUsuario = ({ editar = false, cadastrar = false , idUsuario = ""}: FormularioUsuarioProps) => {
  const [id, setId] = useState("")
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [usuario, setUsuario] = useState<IUsuario>()
  const [submit, setSubmit] = useState(false)
  const [edit, setEdit] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (idUsuario) {
      const fetchUsuario = async () => {
        setEdit(true)

        const usuario = await buscarUsuario(idUsuario);
        if (usuario) {
          setId(usuario.id ?? "")
          setEmail(usuario.email)
          setSenha(usuario.senha)
          setUsuario(usuario)
        }
      };

      fetchUsuario();
    }
  }, []);

  useEffect(() => {
    const handleUsuario = async () => {
      if (usuario) {
        if (editar) {
          await editarUsuario(usuario);

        } else {
          await cadastrarUsuario(usuario);
          navigate("/login")
        }
      }
    };

    if (submit) {
      handleUsuario();
    }
  }, [submit, usuario, navigate]);

  const Submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const usuario: IUsuario = {
      id: id != "" ? id : undefined,
      email,
      senha,
      ativo: true
    }

    setUsuario(usuario)
    setSubmit(true)
  }

  return (
    <section className='formularioUsuario'>
      <form onSubmit={Submit}>

        <CampoTexto
          onAlterado={value => setEmail(value)}
          value={email}
          required={true}
          label="Email"
          placeHolder="Digite seu email"
        />

        <CampoTexto
          onAlterado={value => setSenha(value)}
          value={senha}
          required={true}
          label="Senha"
          placeHolder="Digite sua senha"
          type="password"
        />

        {/* <CampoTexto
          onAlterado={value => setEmail(value)}
          value={email}
          required={true}
          label="Email"
          placeHolder="Digite seu email"
        />

        <CampoTexto
          onAlterado={value => setSenha(value)}
          value={senha}
          required={true}
          label="Senha"
          placeHolder="Digite sua senha"
          type="password"
        /> */}

        <Botao>{cadastrar ? "Cadastrar-se" : editar ? "Editar Usuario" : ""}</Botao>
      </form>
    </section>
  )
}

export default FormularioUsuario