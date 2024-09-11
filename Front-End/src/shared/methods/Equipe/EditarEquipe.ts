import { IEquipe } from "../../interfaces/IEquipe";
import api from "../api";

export const editarEquipe = async (equipe: IEquipe) => {
    try {
        const response = await api.put<IEquipe>("/equipe/editar", equipe);

        if (response.status === 200) {
            console.log("Equipe editada com sucesso:", response.data);
        } else {
            console.error("Erro ao editar equipe:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao tentar editar equipe:", error);
    }
};
