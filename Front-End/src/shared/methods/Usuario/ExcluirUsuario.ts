import api from "../api";

export const excluirUsuario = async (id: string) => {
    try {
        const response = await api.delete("/usuario/excluir/" + id);

        if (response.status !== 204) {
            console.error("Erro ao excluir o usuario:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar excluir o usuario:", error);
    }
}