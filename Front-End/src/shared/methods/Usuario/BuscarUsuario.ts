import { IUsuario } from "../../interfaces/IUsuario";
import api from "../api";

export const buscarUsuario = async (id: string): Promise<IUsuario> => {

    const response = await api.get("/usuario/buscar/" + id);

    try {
        if (response.status !== 200) {
            console.error("Erro ao buscar o usuario:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar buscar o usuario:", error);
    }

    return response.data
}