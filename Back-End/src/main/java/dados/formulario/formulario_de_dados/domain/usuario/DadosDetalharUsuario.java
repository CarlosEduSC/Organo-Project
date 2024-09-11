package dados.formulario.formulario_de_dados.domain.usuario;

public record DadosDetalharUsuario(Long id, String email, String senha, boolean ativo) {

    public DadosDetalharUsuario(Usuario usuario) {
        this(usuario.getId(), usuario.getUsername(), usuario.getSenha(), usuario.getAtivo());
    }

}
