package dados.formulario.formulario_de_dados.domain.colaborador;

import java.net.HttpURLConnection;
import java.net.URL;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "colaboradores")
@Entity(name = "Colaborador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Colaborador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cargo;
    private String email;
    private String telefone;
    private String linkFoto;
    private Boolean ativo;

    public Colaborador(DadosCadastroColaborador dados) {
        this.nome = dados.nome();
        this.cargo = dados.cargo();
        this.email = dados.email();
        this.telefone = dados.telefone();
        this.ativo = true;

        if (dados.linkFoto() != null && dados.linkFoto() != "") {
            if (exists(dados.linkFoto())) {
                this.linkFoto = dados.linkFoto();
            } else {
                this.linkFoto = "https://www.wikiaves.com/img/semfoto.png";
            }
        } else {
            this.linkFoto = "https://www.wikiaves.com/img/semfoto.png";
        }
    }

    public void atualizarColaborador(@Valid DadosAtualizarColaborador dados) {
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }

        if (dados.cargo() != null) {
            this.cargo = dados.cargo();
        }

        if (dados.telefone() != null) {
            this.telefone = dados.telefone();
        }

        if (dados.email() != null) {
            this.email = dados.email();
        }

        if (dados.linkFoto() != null && dados.linkFoto() != "") {
            if (exists(dados.linkFoto())) {
                this.linkFoto = dados.linkFoto();
            } else {
                this.linkFoto = "https://www.wikiaves.com/img/semfoto.png";
            }
        
        } else {
            this.linkFoto = "https://www.wikiaves.com/img/semfoto.png";
        }

        if (dados.ativo() != null) {
            this.ativo = dados.ativo();
        }
    }

    public void desativarColaborador() {
        this.ativo = false;
    }

    public static boolean exists(String URLName) {
        try {
            HttpURLConnection.setFollowRedirects(false);
            HttpURLConnection con = (HttpURLConnection) new URL(URLName).openConnection();
            con.setRequestMethod("HEAD");
            return (con.getResponseCode() == HttpURLConnection.HTTP_OK);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
