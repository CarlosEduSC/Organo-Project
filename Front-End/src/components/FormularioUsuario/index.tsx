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
  if (logar || cadastrar) {
    localStorage.setItem('token', "")
  }

  const [id, setId] = useState("")
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("")

  const [usuario, setUsuario] = useState<IUsuario>()
  const [submit, setSubmit] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (idUsuario && editar) {
      const fetchUsuario = async () => {
        const usuario = await buscarUsuario(idUsuario);
        if (usuario) {
          setId(usuario.id ?? "")
          setNome(usuario.nome)
          setEmail(usuario.email)
          setUsuario(usuario)
        }
      };

      fetchUsuario();
    }
  }, [idUsuario, editar]);

  useEffect(() => {
    if (usuario && confirmar == senha) {
      const handleUsuario = async () => {
        if (editar) {
          await editarUsuario(usuario);
          navigate("/perfil")

        } else if (cadastrar) {
          await cadastrarUsuario(usuario);
          navigate("/login")
        }
      }

      if (submit) {
        handleUsuario();
      }
    };
  }, [submit, usuario, confirmar, senha, editar, cadastrar]);

  useEffect(() => {
    if (usuario && logar) {
      const fetchLogin = async () => {
        const token = await login(usuario);

        localStorage.setItem('token', token)

        navigate("/")
      }
      
      if (submit) {
        fetchLogin();
      }
    };
  }, [submit, usuario, navigate, logar]);

  const Submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const usuarioEnviado: IUsuario = {
      id: id != "" ? id : undefined,
      nome,
      email,
      senha,
      ativo: true
    }

    setUsuario(usuarioEnviado)
    setSubmit(true)
  }

  return (
    <section className='formularioUsuario' style={{margin: cadastrar || editar ? "70px" : ""}}>
      <form onSubmit={Submit} style={{ width: logar ? "35%" : "" }}>
        {cadastrar || editar ? <h2>{cadastrar ? "Preencha os dados para criar sua conta." : editar ? "Edite os dados conforme nescessario." : ""}</h2> : <></>}

        {cadastrar || editar ? <CampoTexto
          onAlterado={value => setNome(value)}
          value={nome}
          required={true}
          label="Nome"
          placeHolder="Digite seu nome"
        /> : <></>}

        <CampoTexto
          onAlterado={value => setEmail(value)}
          value={email}
          required={true}
          label="Email"
          placeHolder={cadastrar ? "Digite o email" : editar ? "Digite o novo email" : logar ? "Digite seu email" : ""}
        />

        <CampoTexto
          onAlterado={value => setSenha(value)}
          value={senha}
          required={true}
          label="Senha"
          placeHolder={cadastrar ? "Digite uma senha" : editar ? "Digite a nova senha" : logar ? "Digite sua senha" : ""}
          type="password"
        />

        {cadastrar || editar ? <CampoTexto
          onAlterado={value => setConfirmar(value)}
          value={confirmar}
          required={true}
          label="Confirmar senha"
          placeHolder={cadastrar ? "Digite novamente a senha" : editar ? "Digite a novamente a nova senha" : ""}
          type="password"
        /> : <></>}

        <Botao>{cadastrar ? "Cadastrar-se" : editar ? "Editar Usuario" : logar ? "Entrar" : ""}</Botao>
      </form>
    </section>
  )
}

export default FormularioUsuario