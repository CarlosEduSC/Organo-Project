import { ITime } from "../../interfaces/ITime";
import api from "../api";

export const buscarTimePeloId = async (idTime: bigint): Promise<ITime> => {

    const response = await api.get<ITime>("/time/buscar-pelo-id/" + idTime);
    return response.data;

}