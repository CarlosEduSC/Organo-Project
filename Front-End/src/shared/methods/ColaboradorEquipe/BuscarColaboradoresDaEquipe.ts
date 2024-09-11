import { IColaborador } from "../../interfaces/IColaborador";
import api from "../api";

export const buscarColaboradoresDaEquipe = async (idEquipe: bigint): Promise<IColaboradorEquipe[]> => {

    const response = await api.get("/colaborador/buscar-colaboradores-equipe/" + idEquipe);

    try {
        if (response.status !== 200) {
            console.error("Erro ao buscar os colaboradores da equipe:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar buscar os colaboradores da equipe:", error);
    }

    return response.data
}