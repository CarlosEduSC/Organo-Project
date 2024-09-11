package dados.formulario.formulario_de_dados.domain.colaborador;

public record DadosDetalharColaborador(Long id, String nome, String cargo, String email, String telefone, String linkFoto, boolean ativo) {
    
    public DadosDetalharColaborador(Colaborador colaborador) {
        this(colaborador.getId(), 
        colaborador.getNome(), 
        colaborador.getCargo(), 
        colaborador.getEmail(), 
        colaborador.getTelefone(),
        colaborador.getLinkFoto(),
        colaborador.getAtivo()
        );
    }
}
