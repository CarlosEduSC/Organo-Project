export interface IColaborador {
    id: bigint
    nome: string
    cargo: string
    telefone: string
    email: string
    linkFoto: string
    ativo?: boolean
}