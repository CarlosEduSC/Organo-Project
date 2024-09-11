import { IColaborador } from "../../interfaces/IColaborador";
import api from "../api";

export const verifyUser = async (): Promise<boolean> => {

    const response = await api.get("/usuario/verify-user");

    return response.data
}