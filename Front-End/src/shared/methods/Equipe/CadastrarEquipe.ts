import { IEquipe } from "../../interfaces/IEquipe";
import api from "../api";

export const cadastrarEquipe = async (equipe: IEquipe) => {

    try {
        const response = await api.post<IEquipe>("/equipe/cadastrar", equipe);

        if (response.status === 201) {
            console.log("Equipe cadastrada com sucesso:", response.data);
        } else {
            console.error("Erro ao cadastrar a equipe:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar cadastrar a equipe:", error);
    }
}