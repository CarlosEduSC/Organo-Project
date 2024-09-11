package dados.formulario.formulario_de_dados.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import dados.formulario.formulario_de_dados.domain.usuario.DadosAutenticacao;
import dados.formulario.formulario_de_dados.domain.usuario.DadosDetalharUsuario;
import dados.formulario.formulario_de_dados.domain.usuario.Usuario;
import dados.formulario.formulario_de_dados.domain.usuario.UsuarioRepository;
import dados.formulario.formulario_de_dados.infra.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private TokenService tokenService;

    @SuppressWarnings("rawtypes")
    @Transactional
    @PostMapping("/cadastrar")
    public ResponseEntity cadastrarUsuario(@Valid @RequestBody DadosAutenticacao dados,
            UriComponentsBuilder uriBuilder) {
        var usuario = new Usuario(dados);

        repository.save(usuario);

        var uri = uriBuilder.path("/usuario/cadastrar/{id}").buildAndExpand(usuario.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosDetalharUsuario(usuario));
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/excluir/{id}")
    public ResponseEntity deletarUsuario(@PathVariable Long id) {
        var usuario = repository.getReferenceById(id);

        usuario.desativarUsuario();

        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings({ "rawtypes", "unused" })
    @GetMapping("/verify-user")
    public ResponseEntity verifyUser(HttpServletRequest request) {
        String token = "";

        if (request.getHeader("Authorization") != null) {
            token = request.getHeader("Authorization").replace("Bearer ", "");
        }

        String userEmail = tokenService.getSubject(token);

        var dados = repository.findByEmail(userEmail);

        var usuario = new Usuario(dados);

        if (usuario != null) {
            if (!repository.existsById(usuario.getId())) {
                throw new RuntimeException("Usuário não encontrado");
            }

            if (!usuario.getAtivo()) {
                throw new RuntimeException("Usuário está com a conta desativada!");
            }

            return ResponseEntity.ok(true);
        }

        return ResponseEntity.ok(false);
    }
}
