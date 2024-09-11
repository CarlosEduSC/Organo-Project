package dados.formulario.formulario_de_dados.domain.colaborador;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {

    List<Colaborador> findAllByAtivoTrue();

    Colaborador findByNome(String nome);
}