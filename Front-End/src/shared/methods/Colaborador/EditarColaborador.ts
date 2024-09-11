import { IColaborador } from "../../interfaces/IColaborador";
import api from "../api";

export const editarColaborador = async (colaborador: IColaborador) => {
    try {
        const response = await api.put<IColaborador>("/colaborador/editar", colaborador);

        if (response.status === 200) {
            console.log("Colaborador editado com sucesso:", response.data);
        } else {
            console.error("Erro ao editar colaborador:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao tentar editar colaborador:", error);
    }
};
