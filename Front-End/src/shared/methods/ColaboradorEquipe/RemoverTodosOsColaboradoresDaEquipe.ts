import api from "../api";

export const removerTodosOsColaboradoresDaEquipe = async (idEquipe: string) => {
    try {
        const response = await api.delete("/colaborador-equipe/remover-todos-colaboradores/" + idEquipe);

        if (response.status !== 204) {
            console.error("Erro ao remover todos os colaboradores da equipe:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar remover todos os colaboradores da equipe:", error);
    }
}