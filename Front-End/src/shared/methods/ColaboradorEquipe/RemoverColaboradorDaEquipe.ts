import api from "../api";

export const removerColaboradorDaEquipe = async (colaboradorEquipe: IColaboradorEquipe) => {
    try {
        const response = await api.delete("/colaborador/excluir", {data:colaboradorEquipe});

        if (response.status !== 204) {
            console.error("Erro ao remover o colaborador da equipe:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar remover o colaborador da equipe:", error);
    }
}