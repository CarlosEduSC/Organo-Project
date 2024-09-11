package dados.formulario.formulario_de_dados.domain.time;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeRepository extends JpaRepository<Time, Long> {
    
    List<Time> findAllByAtivoTrue();

    Time findByNome(String nome);
}
