import { IColaborador } from "../../interfaces/IColaborador";
import api from "../api";

export const buscarTodosColaboradoresAtivos = async (): Promise<IColaborador[]> => {
    const response = await api.get<IColaborador[]>("/funcionario/listar-todos-ativos");

    try {

        if (response.status !== 200) {
            console.error("Erro ao buscar todos os colaboradores ativos:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar buscar todos os colaboradores ativos:", error);
    }

    return response.data
}