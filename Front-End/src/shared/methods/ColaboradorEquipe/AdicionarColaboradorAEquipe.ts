import api from "../api";

export const adicionarColaboradorAEquipe = async (colaboradorEquipe: IColaboradorEquipe) => {

    try {
        const response = await api.post<IColaboradorEquipe>("/colaborador-equipe/adicionar", colaboradorEquipe);

        if (response.status === 201) {
            console.log("Colaborador adicionado a equipe com sucesso:", response.data);
        } else {
            console.error("Erro ao adicionar o colaborador a equipe:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar adicionar o colaborador a equipe:", error);
    }
}