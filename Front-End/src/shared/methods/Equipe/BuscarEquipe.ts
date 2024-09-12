import { IEquipe } from "../../interfaces/IEquipe";
import api from "../api";

export const buscarEquipe = async (idEquipe: string): Promise<IEquipe> => {

    const response = await api.get<IEquipe>("/equipe/buscar/" + idEquipe);
    
    try {
        if (response.status !== 200) {
            console.error("Erro ao buscar a equipe:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar buscar a equipe:", error);
    }

    return response.data;
}