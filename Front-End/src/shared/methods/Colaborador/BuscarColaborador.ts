import { IColaborador } from "../../interfaces/IColaborador";
import api from "../api";

export const buscarColaborador = async (id: bigint): Promise<IColaborador> => {

    const response = await api.get("/colaborador/buscar/" + id);

    try {
        if (response.status !== 200) {
            console.error("Erro ao buscar o colaborador:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar buscar o colaborador:", error);
    }

    return response.data
}