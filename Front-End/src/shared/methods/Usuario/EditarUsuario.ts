import { IUsuario } from "../../interfaces/IUsuario";
import api from "../api";

export const editarUsuario = async (usuario: IUsuario) => {
    try {
        const response = await api.put<IUsuario>("/usuario/editar", usuario);

        if (response.status === 200) {
            console.log("Usuario editado com sucesso:", response.data);
        } else {
            console.error("Erro ao editar usuario:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao tentar editar usuario:", error);
    }
};
