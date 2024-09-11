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

import dados.formulario.formulario_de_dados.domain.equipe.DadosAtualizarEquipe;
import dados.formulario.formulario_de_dados.domain.equipe.DadosCadastroEquipe;
import dados.formulario.formulario_de_dados.domain.equipe.DadosDetalharEquipe;
import dados.formulario.formulario_de_dados.domain.equipe.Equipe;
import dados.formulario.formulario_de_dados.domain.equipe.EquipeRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("equipe")
public class EquipesController {

    @Autowired
    private EquipeRepository repository;

    @SuppressWarnings("rawtypes")
    @PostMapping("/cadastrar")
    @Transactional
    public ResponseEntity cadastrarEquipe(@Valid @RequestBody DadosCadastroEquipe dados, UriComponentsBuilder uriBuilder) {
        var equipe = new Equipe(dados);

        repository.save(equipe);

        var uri = uriBuilder.path("/funcionario/cadastrar/{id}").buildAndExpand(equipe.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosDetalharEquipe(equipe));
    }

    @GetMapping("/listar-todas-ativas")
    public ResponseEntity<List<Equipe>> listarEquipes() {
        var equipes = repository.findAllByAtivoTrue();

        if (equipes.isEmpty()) {
            equipes.add(new Equipe(new DadosCadastroEquipe("Programação", "#57C278", "#D9F7E9")));
            equipes.add(new Equipe(new DadosCadastroEquipe("Front-End", "#82CFF1", "#E8F8FF")));
            equipes.add(new Equipe(new DadosCadastroEquipe("Data Science", "#A6D157", "#F0F8E2")));
            equipes.add(new Equipe(new DadosCadastroEquipe("Devops", "#E06B69", "#FDE7E8")));
            equipes.add(new Equipe(new DadosCadastroEquipe("UX e Design", "#DB6EBF", "#FAE9F5")));
            equipes.add(new Equipe(new DadosCadastroEquipe("Mobile", "#FFBA05", "#FFF5D9")));
            equipes.add(new Equipe(new DadosCadastroEquipe("Inovação e Gestão", "#FF8A29", "#FFEEDF")));
            
            for (Equipe equipe : equipes) {
                repository.save(equipe);
            }
        }

        return ResponseEntity.ok().body(equipes);
    }

    @GetMapping("/listar-todas")
    public ResponseEntity<List<Equipe>> listarEquipesAtivos() {
        var equipes = repository.findAll();

        

        return ResponseEntity.ok(equipes);
    }

    @SuppressWarnings("rawtypes")
    @PutMapping("/editar")
    @Transactional
    public ResponseEntity editarEquipe(@Valid @RequestBody DadosAtualizarEquipe dados) {
        var equipe = repository.getReferenceById(dados.id());

        equipe.atualizarEquipe(dados);

        return ResponseEntity.ok().body(new DadosDetalharEquipe(equipe));
    }

    @SuppressWarnings("rawtypes")
    @DeleteMapping("/excluir/{id}")
    @Transactional
    public ResponseEntity desativarEquipe(@PathVariable Long id) {
        var equipe = repository.getReferenceById(id);

        equipe.desativarEquipe();

        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/buscar/{id}")
    @Transactional
    public ResponseEntity buscarEquipePeloId(@PathVariable Long id) {
        var equipe = repository.getReferenceById(id);

        return ResponseEntity.ok().body(new DadosDetalharEquipe(equipe));
    }
}
