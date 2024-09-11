package dados.formulario.formulario_de_dados.domain.colaboradorEquipe;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "colaborador_equipe")
@Entity(name = "ColaboradorEquipe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ColaboradorEquipeId.class)
public class ColaboradorEquipe {
    @Id
    private Long idColaborador;

    @Id
    private Long idEquipe;
}
