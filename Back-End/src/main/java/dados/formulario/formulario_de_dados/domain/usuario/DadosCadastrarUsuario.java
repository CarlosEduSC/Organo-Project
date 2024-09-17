package dados.formulario.formulario_de_dados.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DadosCadastrarUsuario(
    @NotBlank(message = "O nome não pode estar vazio ou ser nulo!")
    String nome,

    @NotBlank(message = "O email não pode estar vazio ou ser nulo!")
    @Email(message = "O email deve ter um formato valido!")
    String email,
    
    @NotBlank(message = "A senha não pode estar vazio ou ser nulo!")
    String senha
) {}