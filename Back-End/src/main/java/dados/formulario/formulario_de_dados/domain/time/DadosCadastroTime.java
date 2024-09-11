package dados.formulario.formulario_de_dados.domain.time;

import jakarta.validation.constraints.NotBlank;

public record DadosCadastroTime(
    @NotBlank(message = "O nome não pode estar vazio ou ser nulo!")
    String nome,

    @NotBlank(message = "A cor primaria não pode estar vazio ou ser nulo!")
    String corPrimaria,

    @NotBlank(message = "A cor secundaria não pode estar vazio ou ser nulo!")
    String corSecundaria
) {}
