export interface IColaborador {
    id: bigint | string
    nome: string
    cargo: string
    telefone: string
    email: string
    linkFoto: string
    ativo?: boolean
}