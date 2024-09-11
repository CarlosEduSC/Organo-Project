import api from "../api";

export const excluirColaborador = async (id: bigint) => {
    try {
        const response = await api.delete("/colaborador/excluir/" + id);

        if (response.status !== 204) {
            console.error("Erro ao excluir o colaborador:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar excluir o colaborador:", error);
    }
}