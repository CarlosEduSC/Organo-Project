import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Botao from "../Botao"
import CampoTexto from "../CampoTexto"
import "./index.css"
import { IUsuario } from "../../shared/interfaces/IUsuario";
import { cadastrarUsuario } from "../../shared/methods/Usuario/CadastrarUsuario";
import { buscarUsuario } from "../../shared/methods/Usuario/BuscarUsuario";
import { editarUsuario } from "../../shared/methods/Usuario/EditarUsuario";
import { login } from "../../shared/methods/Usuario/Login";

interface FormularioUsuarioProps {
  editar?: boolean
  cadastrar?: boolean
  logar?: boolean
  idUsuario?: string
}

const FormularioUsuario = ({ editar = false, cadastrar = false, logar = false, idUsuario = "" }: FormularioUsuarioProps) => {
  const [id, setId] = useState("")
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

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

  useEffect(() => {
    const fetchLogin = async () => {
      if (usuario) {
        const token = await login(usuario);

        localStorage.setItem('token', token)

        navigate("/")
      }
    };

    if (submit) {
      fetchLogin();
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
      <form onSubmit={Submit} style={{width: logar ? "35%" : ""}}>
        {cadastrar || editar ? <h2>{cadastrar ? "Preencha os dados para criar sua conta." : editar ? "Edite os dados conforme nescessario." : ""}</h2> : <></>}

        <CampoTexto
          onAlterado={value => setEmail(value)}
          value={email}
          required={true}
          label="Email"
          placeHolder={cadastrar ? "Digite o email" : editar ? "Digite o novo email" : logar ?  "Digite seu email" : ""}
        />

        <CampoTexto
          onAlterado={value => setSenha(value)}
          value={senha}
          required={true}
          label="Senha"
          placeHolder={cadastrar ? "Digite uma senha" : editar ? "Digite a nova senha" : logar ? "Digite sua senha" : ""}
          type="password"
        />

        {cadastrar ? <CampoTexto
          onAlterado={value => setSenha(value)}
          value={senha}
          required={true}
          label="Confirmar senha"
          placeHolder="Digite a senha novamente"
          type="password"
        /> : editar && senha != usuario?.senha}

        <Botao>{cadastrar ? "Cadastrar-se" : editar ? "Editar Usuario" : logar ? "Entrar" : ""}</Botao>
      </form>
    </section>
  )
}

export default FormularioUsuario