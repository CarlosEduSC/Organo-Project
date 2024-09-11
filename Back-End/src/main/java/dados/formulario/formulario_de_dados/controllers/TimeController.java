package dados.formulario.formulario_de_dados.controllers;

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

import dados.formulario.formulario_de_dados.domain.time.DadosAtualizarTime;
import dados.formulario.formulario_de_dados.domain.time.DadosCadastroTime;
import dados.formulario.formulario_de_dados.domain.time.DadosDetalharTime;
import dados.formulario.formulario_de_dados.domain.time.Time;
import dados.formulario.formulario_de_dados.domain.time.TimeRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("time")
public class TimeController {

    @Autowired
    private TimeRepository repository;

    @SuppressWarnings("rawtypes")
    @PostMapping("/cadastrar")
    @Transactional
    public ResponseEntity cadastrarTime(@Valid @RequestBody DadosCadastroTime dados, UriComponentsBuilder uriBuilder) {
        var time = new Time(dados);

        repository.save(time);

        var uri = uriBuilder.path("/funcionario/cadastrar/{id}").buildAndExpand(time.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosDetalharTime(time));
    }

    @GetMapping("/listar-todos-ativos")
    public ResponseEntity<List<Time>> listarTimes() {
        var times = repository.findAllByAtivoTrue();

        if (times.isEmpty()) {
            times.add(new Time(new DadosCadastroTime("Programação", "#57C278", "#D9F7E9")));
            times.add(new Time(new DadosCadastroTime("Front-End", "#82CFF1", "#E8F8FF")));
            times.add(new Time(new DadosCadastroTime("Data Science", "#A6D157", "#F0F8E2")));
            times.add(new Time(new DadosCadastroTime("Devops", "#E06B69", "#FDE7E8")));
            times.add(new Time(new DadosCadastroTime("UX e Design", "#DB6EBF", "#FAE9F5")));
            times.add(new Time(new DadosCadastroTime("Mobile", "#FFBA05", "#FFF5D9")));
            times.add(new Time(new DadosCadastroTime("Inovação e Gestão", "#FF8A29", "#FFEEDF")));
            
            for (Time time : times) {
                repository.save(time);
            }
        }

        return ResponseEntity.ok().body(times);
    }

    @GetMapping("/listar-todos")
    public ResponseEntity<List<Time>> listarTimesAtivos() {
        var times = repository.findAll();

        

        return ResponseEntity.ok(times);
    }

    @SuppressWarnings("rawtypes")
    @PutMapping("/editar")
    @Transactional
    public ResponseEntity editarTime(@Valid @RequestBody DadosAtualizarTime dados) {
        var time = repository.getReferenceById(dados.id());

        time.atualizarTime(dados);

        return ResponseEntity.ok().body(new DadosDetalharTime(time));
    }

    @SuppressWarnings("rawtypes")
    @DeleteMapping("/excluir/{id}")
    @Transactional
    public ResponseEntity desativarTime(@PathVariable Long id) {
        var time = repository.getReferenceById(id);

        time.desativarTime();

        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/buscar-pelo-id/{id}")
    @Transactional
    public ResponseEntity buscarTimePeloId(@PathVariable Long id) {
        var time = repository.getReferenceById(id);

        return ResponseEntity.ok().body(new DadosDetalharTime(time));
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/buscar-pelo-nome/{nome}")
    @Transactional
    public ResponseEntity buscarTimePeloNome(@PathVariable String nome) {
        var time = repository.findByNome(nome);

        return ResponseEntity.ok().body(new DadosDetalharTime(time));
    }
}
