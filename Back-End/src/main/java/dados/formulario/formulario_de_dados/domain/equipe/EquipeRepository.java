package dados.formulario.formulario_de_dados.domain.equipe;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipeRepository extends JpaRepository<Equipe, Long> {
    
    List<Equipe> findAllByAtivoTrue();

    Equipe findByNome(String nome);
}
