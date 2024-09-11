import { useEffect, useState } from "react";
import "./index.css"
import CampoTexto from "../CampoTexto";
import Botao from "../Botao";
import SeletorCor from "../SeletorCor";
import { useNavigate } from "react-router-dom";
import Time from "../Time";
import { IColaborador } from "../../shared/interfaces/IColaborador";
import { ITime } from "../../shared/interfaces/ITime";
import { cadastrarTime } from "../../shared/methods/Time/CadastrarTime";

const FormularioCadastroTime = () => {
  const [nome, setNome] = useState("");
  const [corPrimaria, setCorPrimaria] = useState("#6278f7");
  const [corSecundaria, setCorSecundaria] = useState("#F5F5F5");
  const [time, setTime] = useState<ITime>()

  const [submit, setSubmit] = useState(false)

  const navigate = useNavigate();

  const setNomeTime = () => {
    if (nome == "") {
      return "Nome do Time"
    
    } else {
      return nome
    }
  }

  const colaboradores: IColaborador[] = [
    {
      nome: "Nome do funcionario",
      cargo: "Cargo do funcionario",
      telefone: "00 000000000",
      email: "exemplo@ex.com",
      linkFoto: "https://www.wikiaves.com/img/semfoto.png",
      time: "Exemplo Time"
    },
    {
      nome: "Nome do funcionario",
      cargo: "Cargo do funcionario",
      telefone: "00 000000000",
      email: "exemplo@ex.com",
      linkFoto: "https://www.wikiaves.com/img/semfoto.png",
      time: "Exemplo Time"
    },
    {
      nome: "Nome do funcionario",
      cargo: "Cargo do funcionario",
      telefone: "00 000000000",
      email: "exemplo@ex.com",
      linkFoto: "https://www.wikiaves.com/img/semfoto.png",
      time: "Exemplo Time"
    },
    {
      nome: "Nome do funcionario",
      cargo: "Cargo do funcionario",
      telefone: "00 000000000",
      email: "exemplo@ex.com",
      linkFoto: "https://www.wikiaves.com/img/semfoto.png",
      time: "Exemplo Time"
    },
  ]


  useEffect(() => {
    const fetchColaborador = async () => {
      if (time) {
        await cadastrarTime(time);
        navigate("/")
      }
    };

    if (submit) {
      fetchColaborador();
    }
  }, [submit, time]);

  const handleCorPrincipalAlterada = (novaCor: string) => {
    setCorPrimaria(novaCor);
  };

  const handleCorSecundariaAlterada = (novaCor: string) => {
    setCorSecundaria(novaCor);
  };

  const Submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const time: ITime = {
      nome,
      corPrimaria,
      corSecundaria
    }

    setTime(time)
    setSubmit(true)
  }

  return (
    <section className='formularioCadastroTime'>
      <form onSubmit={Submit}>
        <h2>Preencha os dados para criar o novo time.</h2>

        <CampoTexto
          onAlterado={value => setNome(value)}
          value={nome}
          required={true} label="Nome"
          placeHolder="Digite o nome do time"
        />

        <div className="cores">
          <SeletorCor
            label="Cor Principal"
            onCorAlterada={handleCorPrincipalAlterada}
          />

          <SeletorCor
            label="Cor Secundaria"
            onCorAlterada={handleCorSecundariaAlterada}
          />
        </div>

        <Botao>Criar time</Botao>
      </form>

      <Time
        nome={setNomeTime()}
        corPrimaria={corPrimaria}
        corSecundaria={corSecundaria}
        link={false}
        colaboradores={colaboradores}
      />
    </section>
  )
}

export default FormularioCadastroTime