package dados.formulario.formulario_de_dados.domain.colaboradorEquipe;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColaboradorEquipeRepository extends JpaRepository<ColaboradorEquipe, ColaboradorEquipeId> {

    List<ColaboradorEquipe> findAllByIdEquipe(Long idEquipe);

    List<ColaboradorEquipe> findAllByIdColaborador(Long idColaborador);
}