package dados.formulario.formulario_de_dados.domain.colaborador;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizarColaborador(
    @NotNull(message = "O id não pode ser nulo!")
    Long id,
    String nome,
    String cargo,
    String email,
    String telefone,
    String linkFoto,
    Boolean ativo
) {}
