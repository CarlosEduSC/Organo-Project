package dados.formulario.formulario_de_dados.domain.funcionario;

public record DadosDetalharFuncionarios(Long id, String nome, String cargo, String email, String telefone, String linkFoto, boolean ativo) {
    
    public DadosDetalharFuncionarios(Funcionario funcionario) {
        this(funcionario.getId(), 
        funcionario.getNome(), 
        funcionario.getCargo(), 
        funcionario.getEmail(), 
        funcionario.getTelefone(),
        funcionario.getLinkFoto(),
        funcionario.getAtivo()
        );
    }
}
