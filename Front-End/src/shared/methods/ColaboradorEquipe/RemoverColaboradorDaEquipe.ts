import api from "../api";

export const removerColaboradorDaEquipe = async (colaboradorEquipe: IColaboradorEquipe) => {

    console.log(colaboradorEquipe)
    try {
        const response = await api.delete("/colaborador-equipe/remover", {data: { idColaborador: colaboradorEquipe.idColaborador, idEquipe: colaboradorEquipe.idEquipe }});

        if (response.status !== 204) {
            console.error("Erro ao remover o colaborador da equipe:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar remover o colaborador da equipe:", error);
    }
}