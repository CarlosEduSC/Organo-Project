package dados.formulario.formulario_de_dados.domain.colaboradorEquipe;

import jakarta.validation.constraints.NotNull;

public record DadosColaboradorEquipe(
    @NotNull(message = "O id do colaborador não pode ser nulo!")
    Long idColaborador, 

    @NotNull(message = "O id da equipe não pode ser nulo!")
    Long idEquipe) {
}
