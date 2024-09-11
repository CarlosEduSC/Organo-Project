import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Botao from "../Botao"
import CampoTexto from "../CampoTexto"
import "./index.css"
import { IUsuario } from "../../shared/interfaces/IUsuario";
import { login } from "../../shared/methods/Usuario/Login";

const FormularioLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [usuario, setUsuario] = useState<IUsuario>()
  const [submit, setSubmit] = useState(false)

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
      email,
      senha
    }

    setUsuario(usuario)
    setSubmit(true)
  }

  return (
    <section className='formularioLogin'>
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

        <Botao>Entrar</Botao>
      </form>
    </section>
  )
}

export default FormularioLogin