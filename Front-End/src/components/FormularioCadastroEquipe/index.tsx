import { useEffect, useState } from "react";
import "./index.css"
import CampoTexto from "../CampoTexto";
import Botao from "../Botao";
import SeletorCor from "../SeletorCor";
import { useNavigate } from "react-router-dom";
import { IColaborador } from "../../shared/interfaces/IColaborador";
import { IEquipe } from "../../shared/interfaces/IEquipe";
import { cadastrarEquipe } from "../../shared/methods/Equipe/CadastrarEquipe";
import Equipe from "../Equipe";

const FormularioCadastroEquipe = () => {
  const [nome, setNome] = useState("");
  const [corPrimaria, setCorPrimaria] = useState("#6278f7");
  const [corSecundaria, setCorSecundaria] = useState("#F5F5F5");

  const [equipe, setEquipe] = useState<IEquipe>({nome:"",corPrimaria:"",corSecundaria:""})

  const [submit, setSubmit] = useState(false)

  const navigate = useNavigate();

  const setNomeEquipe = () => {
    if (nome == "") {
      return "Nome da Equipe"
    
    } else {
      return nome
    }
  }

  const colaboradores: IColaborador[] = []

  for (let i=1; i <= 4 ; i++) {
    const colaborador: IColaborador = {
      id: "0",
      nome: "Nome do funcionario",
      cargo: "Cargo do funcionario",
      telefone: "00 000000000",
      email: "exemplo@ex.com",
      linkFoto: "https://www.wikiaves.com/img/semfoto.png"
    }

    colaboradores.push(colaborador)
  }

  useEffect(() => {
    const fetchEquipeChange = async () => {
      if (equipe) {
        const equipe: IEquipe = {
          nome:setNomeEquipe(),
          corPrimaria,
          corSecundaria
        }
    
        setEquipe(equipe)
      }
    };

    
    fetchEquipeChange();
    
  }, [equipe]);


  useEffect(() => {
    const fetchColaborador = async () => {
      if (equipe) {
        await cadastrarEquipe(equipe);
        navigate("/")
      }
    };

    if (submit) {
      fetchColaborador();
    }
  }, [submit, equipe]);

  const handleCorPrincipalAlterada = (novaCor: string) => {
    setCorPrimaria(novaCor);
  };

  const handleCorSecundariaAlterada = (novaCor: string) => {
    setCorSecundaria(novaCor);
  };

  const Submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const equipe: IEquipe = {
      nome,
      corPrimaria,
      corSecundaria
    }

    setEquipe(equipe)
    setSubmit(true)
  }

  return (
    <section className='formularioCadastroEquipe'>
      <form onSubmit={Submit}>
        <h2>Preencha os dados para criar uma nova equipe.</h2>

        <CampoTexto
          onAlterado={value => setNome(value)}
          value={nome}
          required={true} label="Nome"
          placeHolder="Digite o nome da equipe"
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

        <Botao>Criar equipe</Botao>
      </form>

      <Equipe
        equipe={equipe}
        link={false}
        colaboradoresPadrao={colaboradores}
      />
    </section>
  )
}

export default FormularioCadastroEquipe