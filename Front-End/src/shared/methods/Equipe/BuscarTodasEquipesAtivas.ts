import { IEquipe } from "../../interfaces/IEquipe";
import api from "../api";

export const buscarTodasEquipesAtivas = async (): Promise<IEquipe[]> => {

    const response = await api.get<IEquipe[]>("/equipe/listar-todas-ativas");

    try {
        if (response.status !== 200) {
            console.error("Erro ao buscar as equipes ativas:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar buscar as equipes ativas:", error);
    }

    return response.data;

}