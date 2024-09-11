package dados.formulario.formulario_de_dados.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import dados.formulario.formulario_de_dados.domain.colaborador.DadosAtualizarColaborador;
import dados.formulario.formulario_de_dados.domain.colaborador.DadosCadastroColaborador;
import dados.formulario.formulario_de_dados.domain.colaborador.DadosDetalharColaborador;
import dados.formulario.formulario_de_dados.domain.colaborador.Colaborador;
import dados.formulario.formulario_de_dados.domain.colaborador.ColaboradorRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("colaborador")
public class ColaboradorController {

    @Autowired
    private ColaboradorRepository repository;

    @SuppressWarnings("rawtypes")
    @Transactional
    @PostMapping("/cadastrar")
    public ResponseEntity cadastroColaborador(@Valid @RequestBody DadosCadastroColaborador dados,
            UriComponentsBuilder uriBuilder) {
        var colaborador = new Colaborador(dados);
        repository.save(colaborador);

        var uri = uriBuilder.path("/colaborador/cadastrar/{id}").buildAndExpand(colaborador.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosDetalharColaborador(colaborador));
    }

    @GetMapping("/listar-todos")
    public ResponseEntity<List<DadosDetalharColaborador>> listarTodosColabores() {
        var colaboradores = repository.findAll();

        List<DadosDetalharColaborador> daoColaboradores = new ArrayList<>();

        for (Colaborador colaborador : colaboradores) {
            daoColaboradores.add(new DadosDetalharColaborador(colaborador));
        }

        return ResponseEntity.ok(daoColaboradores);
    }

    @GetMapping("/listar-todos-ativos")
    public ResponseEntity<List<DadosDetalharColaborador>> listarTodosColaboradoresAtivos() {
        var colaboradores = repository.findAllByAtivoTrue();

        List<DadosDetalharColaborador> daoColaboradores = new ArrayList<>();

        for (Colaborador colaborador : colaboradores) {
            daoColaboradores.add(new DadosDetalharColaborador(colaborador));
        }

        return ResponseEntity.ok(daoColaboradores);
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @PutMapping("/editar")
    public ResponseEntity editarColaborador(@Valid @RequestBody DadosAtualizarColaborador dados) {
        Colaborador colaborador;

        colaborador = repository.getReferenceById(dados.id());

        colaborador.atualizarColaborador(dados);

        return ResponseEntity.ok(new DadosDetalharColaborador(colaborador));
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/excluir/{id}")
    public ResponseEntity desativarColaborador(@PathVariable Long id) {
        var colaborador = repository.getReferenceById(id);

        colaborador.desativarColaborador();

        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/buscar/{id}")
    public ResponseEntity buscarColaboradorPeloId(@PathVariable Long id) {
        var colaborador = repository.getReferenceById(id);

        return ResponseEntity.ok(new DadosDetalharColaborador(colaborador));
    }

}
