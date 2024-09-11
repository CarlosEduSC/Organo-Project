import { ITime } from "../../interfaces/ITime";
import api from "../api";

export const buscarTimePeloNome = async (nomeTime: String): Promise<ITime> => {

    const response = await api.get<ITime>("/time/buscar-pelo-nome/" + nomeTime);
    return response.data;

}