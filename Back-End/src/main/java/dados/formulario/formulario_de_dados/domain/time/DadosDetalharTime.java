package dados.formulario.formulario_de_dados.domain.time;

public record DadosDetalharTime(Long id, String nome, String corPrimaria, String corSecundaria, boolean ativo) {

    public DadosDetalharTime(Time time) {
        this(time.getId(), time.getNome(), time.getCorPrimaria(), time.getCorSecundaria(), time.getAtivo());
    }}