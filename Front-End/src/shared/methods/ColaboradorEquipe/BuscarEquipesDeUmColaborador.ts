import { IColaborador } from "../../interfaces/IColaborador";
import api from "../api";

export const buscarEquipesDeUmColaborador = async (idColaborador: bigint): Promise<IColaboradorEquipe[]> => {

    const response = await api.get("/colaborador/buscar-equipes-colaborador/" + idColaborador);

    try {
        if (response.status !== 200) {
            console.error("Erro ao buscar as equipes do colaborador:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar buscar as equipes do colaborador:", error);
    }

    return response.data
}