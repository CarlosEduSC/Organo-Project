package dados.formulario.formulario_de_dados.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dados.formulario.formulario_de_dados.domain.usuario.DadosAutenticacao;
import dados.formulario.formulario_de_dados.domain.usuario.Usuario;
import dados.formulario.formulario_de_dados.infra.security.DadosTokenJWT;
import dados.formulario.formulario_de_dados.infra.security.TokenService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/login")
public class AutenticationController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;
    
    @SuppressWarnings("rawtypes")
    @PostMapping
    public ResponseEntity efetuarLogin(@Valid @RequestBody DadosAutenticacao dados) {
        var autenticationToken = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());

        var autentication = manager.authenticate(autenticationToken);

        var tokenJWT = tokenService.tokenGenerator((Usuario) autentication.getPrincipal());

        return ResponseEntity.ok().body(new DadosTokenJWT(tokenJWT));
    }
}
