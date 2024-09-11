import './index.css'
import CampoTexto from '../CampoTexto'
import Botao from '../Botao'
import { useEffect, useState } from 'react'
import { IColaborador } from '../../shared/interfaces/IColaborador'
import { cadastrarColaborador } from '../../shared/methods/Colaborador/CadastrarColaborador'
import { useNavigate } from 'react-router-dom'
import { editarColaborador } from '../../shared/methods/Colaborador/EditarColaborador'
import { buscarColaborador } from '../../shared/methods/Colaborador/BuscarColaborador'

interface FormularioColaboradorProps {
  idColaborador?: bigint
}

const FormularioColaborador = ({ idColaborador }: FormularioColaboradorProps) => {
  const [id, setId] = useState(BigInt(0))
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [linkFoto, setLinkFoto] = useState("");

  const [colaborador, setColaborador] = useState<IColaborador>()
  const [submit, setSubmit] = useState(false)

  const navigate = useNavigate();

  const [editar, setEditar] = useState(false)

  useEffect(() => {
    if (idColaborador) {
      const fetchColaborador = async () => {
        setEditar(true)

        const colaborador = await buscarColaborador(idColaborador);
        if (colaborador) {
          setId(BigInt(colaborador.id))
          setNome(colaborador.nome)
          setCargo(colaborador.cargo)
          setTelefone(colaborador.telefone)
          setEmail(colaborador.email)
          setLinkFoto(colaborador.linkFoto === "https://www.wikiaves.com/img/semfoto.png" ? "" : colaborador.linkFoto)
          setColaborador(colaborador)
        }
      };

      fetchColaborador();
    }
  }, []);

  useEffect(() => {
    const handleColaborador = async () => {
      if (colaborador) {
        if (editar) {
          await editarColaborador(colaborador);
        
        } else {
          await cadastrarColaborador(colaborador);
        }
        
        navigate("/colaboradores")
      }
    };

    if (submit) {
      handleColaborador();
    }
  }, [submit, colaborador, navigate]);

  const Submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const colaborador: IColaborador = {
      id:id.toString(),
      nome,
      cargo,
      telefone,
      email,
      linkFoto,
      ativo:true
    }

    if (colaborador.linkFoto == null || colaborador.linkFoto == "" || colaborador.linkFoto == undefined) {
      colaborador.linkFoto = "https://www.wikiaves.com/img/semfoto.png"
    }

    setColaborador(colaborador)
    setSubmit(true)
  }

  return (
    <section className='formularioCadastroColaborador'>
      <form onSubmit={Submit}>
        <h2>{idColaborador == null ? "Preencha os dados para criar o card do colaborador." : "Edite os dados conforme nescessario."}</h2>

        <CampoTexto
          onAlterado={value => setNome(value)}
          value={nome ?? ""}
          required={true} label="Nome"
          placeHolder="Digite o nome do colaborador"
        />

        <CampoTexto
          onAlterado={value => setCargo(value)}
          value={cargo ?? ""}
          required={true}
          label="Cargo"
          placeHolder="Digite o cargo do colaborador"
        />

        <CampoTexto
          onAlterado={value => setTelefone(value)}
          value={telefone ?? ""}
          required={true}
          label="Telefone"
          placeHolder="Digite o telefone do colaborador"
        />

        <CampoTexto
          onAlterado={value => setEmail(value)}
          value={email ?? ""}
          required={true}
          label="Email"
          placeHolder="Digite o email do colaborador"
          type='email'
        />

        <CampoTexto
          onAlterado={value => setLinkFoto(value)}
          value={linkFoto ?? ""}
          label="Foto"
          placeHolder="Informe o endereço da foto do colaborador"
        />

        <Botao>{idColaborador == null ? "Cadastrar Colaborador": "Editar Colaborador"}</Botao>
      </form>
    </section>
  )
}

export default FormularioColaborador