import { IEquipe } from "../../interfaces/IEquipe";
import api from "../api";
import { buscarEquipe } from "../Equipe/BuscarEquipe";

export const buscarEquipesDeUmColaborador = async (idColaborador: string): Promise<IEquipe[]> => {

    const response = await api.get("/colaborador-equipe/buscar-equipes-colaborador/" + idColaborador);

    let equipes: IEquipe[] = []

    try {
        if (response.status !== 200) {
            console.error("Erro ao buscar as equipes do colaborador:", response.statusText);
            return []
        }

        const equipesColaborador = response.data as { id: string }[];

        const idEquipes: string [] = []

        equipesColaborador.forEach(idEquipe => {
            idEquipes.push(idEquipe.id)
        });
        
        equipes = await Promise.all(
            idEquipes.map(async (id) => {
                return await buscarEquipe(id);
            })
        );
    
    } catch (error) {
        console.error("Erro ao tentar buscar as equipes do colaborador:", error);
        return []
    }

    return equipes
}