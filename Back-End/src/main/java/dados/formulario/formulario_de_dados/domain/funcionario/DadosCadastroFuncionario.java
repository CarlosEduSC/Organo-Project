package dados.formulario.formulario_de_dados.domain.funcionario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DadosCadastroFuncionario(
    @NotBlank(message = "O nome não pode estar vazio ou ser nulo!")
    String nome,

    @NotBlank(message = "O cargo não pode estar vazio ou ser nulo!")
    String cargo,

    @NotBlank(message = "O email não pode estar vazio ou ser nulo!")
    @Email(message = "O email deve ter um formato valido!")
    String email,

    @NotBlank(message = "O telefone não pode estar vazio ou ser nulo!")
    String telefone,
    
    String linkFoto
) {}
