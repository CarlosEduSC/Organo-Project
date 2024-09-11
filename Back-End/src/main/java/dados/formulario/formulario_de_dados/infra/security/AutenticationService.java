package dados.formulario.formulario_de_dados.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dados.formulario.formulario_de_dados.domain.usuario.Usuario;
import dados.formulario.formulario_de_dados.domain.usuario.UsuarioRepository;

@Service
public class AutenticationService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        var dados = repository.findByEmail(userEmail);

        var usuario = new Usuario(dados);

        return usuario;
    }
}
