package dados.formulario.formulario_de_dados.domain.usuario;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizarUsuario(
    @NotNull(message = "O id não pode ser nulo!")
    Long id,
    String nome,
    String email,
    String senha,
    Boolean ativo
) {}
