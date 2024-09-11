import { ITime } from "../../interfaces/ITime";
import api from "../api";

export const cadastrarTime = async (time: ITime): Promise<void> => {

    const response = await api.post<ITime>("/time/cadastrar", time);

    response
}