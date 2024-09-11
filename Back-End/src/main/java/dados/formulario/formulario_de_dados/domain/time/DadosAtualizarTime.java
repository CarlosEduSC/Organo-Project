package dados.formulario.formulario_de_dados.domain.time;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizarTime(
    @NotNull(message = "O id não pode ser nulo!")
    Long id,
    String nome,
    String corPrimaria,
    String corSecundaria,
    Boolean ativo
) {}
