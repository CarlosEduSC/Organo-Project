import { IEquipe } from "../../interfaces/IEquipe";
import api from "../api";

export const excluirEquipe = async (idEquipe: string) => {
    try {
        const response = await api.delete<IEquipe>("/equipe/excluir/" + idEquipe);

        if (response.status !== 204) {
            console.error("Erro ao excluir a equipe:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar excluir a equipe:", error);
    }
}