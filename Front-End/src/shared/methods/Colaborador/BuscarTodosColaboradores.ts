import { IColaborador } from "../../interfaces/IColaborador";
import api from "../api";

export const buscarTodosColaboradores = async (): Promise<IColaborador[]> => {
    const response = await api.get<IColaborador[]>("/colaborador/listar-todos");

    try {

        if (response.status !== 200) {
            console.error("Erro ao buscar todos os colaboradores:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar buscar todos os colaboradores:", error);
    }

    return response.data
}