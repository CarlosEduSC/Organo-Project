import { IEquipe } from "../../interfaces/IEquipe";
import api from "../api";

export const buscarTodasEquipes = async (): Promise<IEquipe[]> => {

    const response = await api.get<IEquipe[]>("/equipe/listar-todas");

    try {
        if (response.status !== 200) {
            console.error("Erro ao buscar as equipes:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar buscar as equipes:", error);
    }

    return response.data;

}