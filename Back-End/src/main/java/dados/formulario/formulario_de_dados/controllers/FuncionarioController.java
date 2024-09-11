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

import dados.formulario.formulario_de_dados.domain.funcionario.DadosAtualizarFuncionario;
import dados.formulario.formulario_de_dados.domain.funcionario.DadosCadastroFuncionario;
import dados.formulario.formulario_de_dados.domain.funcionario.DadosDetalharFuncionarios;
import dados.formulario.formulario_de_dados.domain.funcionario.Funcionario;
import dados.formulario.formulario_de_dados.domain.funcionario.FuncionarioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("funcionario")
public class FuncionarioController {

    @Autowired
    private FuncionarioRepository repository;

    @SuppressWarnings("rawtypes")
    @Transactional
    @PostMapping("/cadastrar")
    public ResponseEntity cadastroFuncionario(@Valid @RequestBody DadosCadastroFuncionario dados,
            UriComponentsBuilder uriBuilder) {
        var funcionario = new Funcionario(dados);
        repository.save(funcionario);

        var uri = uriBuilder.path("/funcionario/cadastrar/{id}").buildAndExpand(funcionario.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosDetalharFuncionarios(funcionario));
    }

    @GetMapping("/listar-todos")
    public ResponseEntity<List<DadosDetalharFuncionarios>> listarTodosFuncionarios() {
        var funcionarios = repository.findAll();

        List<DadosDetalharFuncionarios> daoFuncionarios = new ArrayList<>();

        for (Funcionario funcionario : funcionarios) {
            daoFuncionarios.add(new DadosDetalharFuncionarios(funcionario));
        }

        return ResponseEntity.ok(daoFuncionarios);
    }

    @GetMapping("/listar-todos-ativos")
    public ResponseEntity<List<DadosDetalharFuncionarios>> listarTodosFuncionariosAtivos() {
        var funcionarios = repository.findAllByAtivoTrue();

        List<DadosDetalharFuncionarios> daoFuncionarios = new ArrayList<>();

        for (Funcionario funcionario : funcionarios) {
            daoFuncionarios.add(new DadosDetalharFuncionarios(funcionario));
        }

        return ResponseEntity.ok(daoFuncionarios);
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @PutMapping("/editar")
    public ResponseEntity editarFuncionario(@Valid @RequestBody DadosAtualizarFuncionario dados) {
        Funcionario funcionario;

        funcionario = repository.getReferenceById(dados.id());

        funcionario.atualizarFuncionario(dados);

        return ResponseEntity.ok(new DadosDetalharFuncionarios(funcionario));
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/excluir/{id}")
    public ResponseEntity desativarFuncionario(@PathVariable Long id) {
        var funcionario = repository.getReferenceById(id);

        funcionario.desativarFuncionario();

        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/buscar/{id}")
    public ResponseEntity buscarFuncionarioPeloId(@PathVariable Long id) {
        var funcionario = repository.getReferenceById(id);

        return ResponseEntity.ok(new DadosDetalharFuncionarios(funcionario));
    }

}
