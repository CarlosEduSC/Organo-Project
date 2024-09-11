package dados.formulario.formulario_de_dados.domain.colaboradorEquipe;

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
public class ColaboradorEquipeId implements Serializable {
    private Long idColaborador;
    private Long idEquipe;
}
