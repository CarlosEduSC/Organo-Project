package dados.formulario.formulario_de_dados.domain.equipe;

public record DadosDetalharEquipe(Long id, String nome, String corPrimaria, String corSecundaria, boolean ativo) {

    public DadosDetalharEquipe(Equipe equipe) {
        this(equipe.getId(), equipe.getNome(), equipe.getCorPrimaria(), equipe.getCorSecundaria(), equipe.getAtivo());
    }}