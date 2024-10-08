package dados.formulario.formulario_de_dados.domain.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    DadosDetalharUsuario findByEmail(String email);
}
