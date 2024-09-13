import api from "../api";

export const RemoverColaboradorDeTodasAsEquipes = async (idColaborador: string) => {
    try {
        const response = await api.delete("/colaborador-equipe/remover-colaborador-todas-equipes/" + idColaborador);

        if (response.status !== 204) {
            console.error("Erro ao remover o colaborador de todas as equipes que ele esta incluido:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar remover o colaborador de todas as equipes que ele esta incluido:", error);
    }
}