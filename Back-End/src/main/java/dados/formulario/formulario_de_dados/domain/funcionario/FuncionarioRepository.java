package dados.formulario.formulario_de_dados.domain.funcionario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    List<Funcionario> findAllByAtivoTrue();

    Funcionario findByNome(String nome);
}