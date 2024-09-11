package dados.formulario.formulario_de_dados.domain.funcionarioTime;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class FuncionarioTimeId implements Serializable {
    private Long idFuncionario;
    private Long idTime;
}
