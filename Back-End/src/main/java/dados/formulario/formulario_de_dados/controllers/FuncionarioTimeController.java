package dados.formulario.formulario_de_dados.controllers;

import java.util.ArrayList;
import java.util.List;

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

import dados.formulario.formulario_de_dados.domain.funcionarioTime.DadosBuscarFuncionarioTime;
import dados.formulario.formulario_de_dados.domain.funcionarioTime.DadosFuncionarioTime;
import dados.formulario.formulario_de_dados.domain.funcionarioTime.FuncionarioTime;
import dados.formulario.formulario_de_dados.domain.funcionarioTime.FuncionarioTimeId;
import dados.formulario.formulario_de_dados.domain.funcionarioTime.FuncionarioTimeRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("funcionario-time")
public class FuncionarioTimeController {

    @Autowired
    private FuncionarioTimeRepository repository;

    @SuppressWarnings("rawtypes")
    @Transactional
    @PostMapping("/adicionar")
    public ResponseEntity adicionarFuncionarioAoTime(@RequestBody @Valid DadosFuncionarioTime dados, UriComponentsBuilder uriBuilder) {
        if (!repository.existsById(new FuncionarioTimeId(dados.idFuncionario(), dados.idTime()))) {
            FuncionarioTime funcionarioTime = new FuncionarioTime();

            funcionarioTime.setIdFuncionario(dados.idFuncionario());
            funcionarioTime.setIdTime(dados.idTime());

            repository.save(funcionarioTime);
            
            var uri = uriBuilder.path("/funcionario-time/adicionar/{idTime}/{idFuncionario}").buildAndExpand(dados.idTime(), dados.idFuncionario()).toUri();

            return ResponseEntity.created(uri).body(dados);

        } else {
            throw new RuntimeException("O funcionário já está no time.");
        }
    }

    @GetMapping("/buscar-funcionarios-time/{idTime}")
    public ResponseEntity<List<DadosBuscarFuncionarioTime>> buscarFuncionariosNoTime(@PathVariable Long idTime) {
        var funcionariosTime = repository.findAllByIdTime(idTime);

        List<DadosBuscarFuncionarioTime> idFuncionarios = new ArrayList<>();

        for (FuncionarioTime funcionarioTime : funcionariosTime) {
            idFuncionarios.add(new DadosBuscarFuncionarioTime(funcionarioTime.getIdFuncionario()));
        }

        return ResponseEntity.ok(idFuncionarios);
    }

    @GetMapping("/buscar-times-funcionario/{idFuncionario}")
    public ResponseEntity<List<DadosBuscarFuncionarioTime>> buscarTimesdoFuncionario(@PathVariable Long idFuncionario) {
        var timesFuncionario = repository.findAllByIdFuncionario(idFuncionario);

        List<DadosBuscarFuncionarioTime> idTimes = new ArrayList<>();

        for (FuncionarioTime funcionarioTime : timesFuncionario) {
            idTimes.add(new DadosBuscarFuncionarioTime(funcionarioTime.getIdTime()));
        }

        return ResponseEntity.ok(idTimes);
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/remover")
    public ResponseEntity removerFuncionarioDoTime(@RequestBody DadosFuncionarioTime dados) {
        FuncionarioTimeId funcionarioTimeId = new FuncionarioTimeId(dados.idFuncionario(), dados.idTime());

        repository.deleteById(funcionarioTimeId);

        return ResponseEntity.noContent().build();
    }
}
