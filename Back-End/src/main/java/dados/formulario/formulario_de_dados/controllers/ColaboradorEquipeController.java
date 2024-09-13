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

import dados.formulario.formulario_de_dados.domain.colaboradorEquipe.DadosBuscarColaboradorEquipe;
import dados.formulario.formulario_de_dados.domain.colaboradorEquipe.DadosColaboradorEquipe;
import dados.formulario.formulario_de_dados.domain.colaboradorEquipe.ColaboradorEquipe;
import dados.formulario.formulario_de_dados.domain.colaboradorEquipe.ColaboradorEquipeId;
import dados.formulario.formulario_de_dados.domain.colaboradorEquipe.ColaboradorEquipeRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("colaborador-equipe")
public class ColaboradorEquipeController {

    @Autowired
    private ColaboradorEquipeRepository repository;

    @SuppressWarnings("rawtypes")
    @Transactional
    @PostMapping("/adicionar")
    public ResponseEntity adicionarColaboradorAoEquipe(@RequestBody @Valid DadosColaboradorEquipe dados, UriComponentsBuilder uriBuilder) {
        if (!repository.existsById(new ColaboradorEquipeId(dados.idColaborador(), dados.idEquipe()))) {
            ColaboradorEquipe colaboradorEquipe = new ColaboradorEquipe();

            colaboradorEquipe.setIdColaborador(dados.idColaborador());
            colaboradorEquipe.setIdEquipe(dados.idEquipe());

            repository.save(colaboradorEquipe);
            
            var uri = uriBuilder.path("/colaborador-equipe/adicionar/{idEquipe}/{idColaborador}").buildAndExpand(dados.idEquipe(), dados.idColaborador()).toUri();

            return ResponseEntity.created(uri).body(dados);

        } else {
            throw new RuntimeException("O funcionário já está na equipe.");
        }
    }

    @GetMapping("/buscar-colaboradores-equipe/{idEquipe}")
    public ResponseEntity<List<DadosBuscarColaboradorEquipe>> buscarColaboradoresNoEquipe(@PathVariable Long idEquipe) {
        var colaboradoresEquipe = repository.findAllByIdEquipe(idEquipe);

        List<DadosBuscarColaboradorEquipe> idColaboradores = new ArrayList<>();

        for (ColaboradorEquipe colaboradorEquipe : colaboradoresEquipe) {
            idColaboradores.add(new DadosBuscarColaboradorEquipe(colaboradorEquipe.getIdColaborador()));
        }

        return ResponseEntity.ok(idColaboradores);
    }

    @GetMapping("/buscar-equipes-colaborador/{idColaborador}")
    public ResponseEntity<List<DadosBuscarColaboradorEquipe>> buscarEquipesdoColaborador(@PathVariable Long idColaborador) {
        var equipesColaborador = repository.findAllByIdColaborador(idColaborador);

        List<DadosBuscarColaboradorEquipe> idEquipes = new ArrayList<>();

        for (ColaboradorEquipe colaboradorEquipe : equipesColaborador) {
            idEquipes.add(new DadosBuscarColaboradorEquipe(colaboradorEquipe.getIdEquipe()));
        }

        return ResponseEntity.ok(idEquipes);
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/remover-colaborador")
    public ResponseEntity removerColaboradorDaEquipe(@RequestBody DadosColaboradorEquipe dados) {
        ColaboradorEquipeId colaboradorEquipeId = new ColaboradorEquipeId(dados.idColaborador(), dados.idEquipe());

        repository.deleteById(colaboradorEquipeId);

        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/remover-todos-colaboradores/{idEquipe}")
    public ResponseEntity removerTodosOsColaboradoresDaEquipe(@PathVariable Long idEquipe) {
        var colaboradoresEquipe = repository.findAllByIdEquipe(idEquipe);

        for (ColaboradorEquipe colaboradorEquipe : colaboradoresEquipe) {
            ColaboradorEquipeId colaboradorEquipeId = new ColaboradorEquipeId(colaboradorEquipe.getIdColaborador(), colaboradorEquipe.getIdEquipe());

            repository.deleteById(colaboradorEquipeId);
        }

        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/remover-colaborador-todas-equipes/{idColaborador}")
    public ResponseEntity removerColaboradorDeTodasAsEquipes(@PathVariable Long idColaborador) {
        var colaboradoresEquipe = repository.findAllByIdColaborador(idColaborador);

        for (ColaboradorEquipe colaboradorEquipe : colaboradoresEquipe) {
            ColaboradorEquipeId colaboradorEquipeId = new ColaboradorEquipeId(colaboradorEquipe.getIdColaborador(), colaboradorEquipe.getIdEquipe());

            repository.deleteById(colaboradorEquipeId);
        }

        return ResponseEntity.noContent().build();
    }
}
