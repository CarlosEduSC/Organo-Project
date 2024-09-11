import { IColaborador } from "../../interfaces/IColaborador";
import api from "../api";

export const cadastrarColaborador = async (colaborador: IColaborador): Promise<void> => {

    try {
        const response = await api.post<IColaborador>("/funcionario/cadastrar", colaborador);

        if (response.status === 201) {
            console.log("Colaborador cadastrado com sucesso:", response.data);
        } else {
            console.error("Erro ao cadastrar colaborador:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar cadastrar colaborador:", error);
    }
}