import { IUsuario } from "../../interfaces/IUsuario";
import api from "../api";

export const cadastrarUsuario = async (usuario: IUsuario) => {
    try {
        const response = await api.post<IUsuario>("/usuario/cadastrar", usuario);

        if (response.status === 201) {
            console.log("Usuario cadastrado com sucesso:", response.data);
        } else {
            console.error("Erro ao cadastrar usuario:", response.statusText);
        }
    
    } catch (error) {
        console.error("Erro ao tentar cadastrar usuario:", error);
    }
}