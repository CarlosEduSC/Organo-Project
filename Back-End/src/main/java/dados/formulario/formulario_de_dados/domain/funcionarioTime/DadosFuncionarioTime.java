package dados.formulario.formulario_de_dados.domain.funcionarioTime;

import jakarta.validation.constraints.NotNull;

public record DadosFuncionarioTime(
    @NotNull(message = "O id do funcionario não pode ser nulo!")
    Long idFuncionario, 

    @NotNull(message = "O id do time não pode ser nulo!")
    Long idTime) {
}
