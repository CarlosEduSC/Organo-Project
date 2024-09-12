import { IColaborador } from "../../interfaces/IColaborador";
import api from "../api";
import { buscarColaborador } from "../Colaborador/BuscarColaborador";

export const buscarColaboradoresDaEquipe = async (idEquipe: string): Promise<IColaborador[]> => {

    const response = await api.get("/colaborador-equipe/buscar-colaboradores-equipe/" + idEquipe);

    let colaboradores: IColaborador[] = []

    try {
        if (response.status !== 200) {
            console.error("Erro ao buscar os colaboradores da equipe:", response.statusText);
            return [];
        }

        const colaboradoresEquipe = response.data as { id: string }[];

        const idColaboradores: string [] = []

        colaboradoresEquipe.forEach(idColaborador => {
            idColaboradores.push(idColaborador.id)
        });
        
        colaboradores = await Promise.all(
            idColaboradores.map(async (id) => {
                return await buscarColaborador(id);
            })
        );

    } catch (error) {
        console.error("Erro ao tentar buscar os colaboradores da equipe:", error);
        return []
    }

    return colaboradores;
}