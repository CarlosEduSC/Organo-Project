package dados.formulario.formulario_de_dados.domain.funcionarioTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "funcionario_equipe")
@Entity(name = "FuncioarioTime")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(FuncionarioTimeId.class)
public class FuncionarioTime {
    @Id
    private Long idFuncionario;

    @Id
    private Long idTime;
}
