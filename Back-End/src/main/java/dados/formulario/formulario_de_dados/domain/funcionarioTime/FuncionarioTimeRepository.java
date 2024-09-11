package dados.formulario.formulario_de_dados.domain.funcionarioTime;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionarioTimeRepository extends JpaRepository<FuncionarioTime, FuncionarioTimeId> {

    List<FuncionarioTime> findAllByIdTime(Long idTime);

    List<FuncionarioTime> findAllByIdFuncionario(Long idFuncionario);
}