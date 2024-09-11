package dados.formulario.formulario_de_dados.domain.funcionario;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizarFuncionario(
    @NotNull(message = "O id não pode ser nulo!")
    Long id,
    String nome,
    String cargo,
    String email,
    String telefone,
    String linkFoto,
    boolean ativo
) {}
