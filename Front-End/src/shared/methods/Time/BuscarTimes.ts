import { ITime } from "../../interfaces/ITime";
import api from "../api";

export const buscarTimes = async (): Promise<ITime[]> => {

    const response = await api.get<ITime[]>("/time/listar-todos-ativos");
    return response.data;

}