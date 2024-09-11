import { IUsuario } from "../../interfaces/IUsuario";
import api from "../api";

export const login = async (usuario: IUsuario) => {

    const response = await api.post("/login", usuario);

    const token = response.data.tokenJWT

    localStorage.setItem('token', token)

    return token
}