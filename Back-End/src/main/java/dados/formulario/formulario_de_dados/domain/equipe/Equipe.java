package dados.formulario.formulario_de_dados.domain.equipe;

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

@Table(name = "equipes")
@Entity(name = "Equipe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Equipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String corPrimaria;
    private String corSecundaria;
    private Boolean ativo;

    public Equipe(DadosCadastroEquipe dados) {
        this.nome = dados.nome();
        this.ativo = true;

        if (dados.corPrimaria() != null && isValidHexColor(dados.corPrimaria()) == true) {
            this.corPrimaria = dados.corPrimaria();

            System.out.println("asdasdasddasdsaasd");
        
        } else {
            this.corPrimaria = "#D9D9D9";
        }

        if (dados.corSecundaria() != null && isValidHexColor(dados.corSecundaria()) == true) {
            this.corSecundaria = dados.corSecundaria();
        
        } else {
            this.corSecundaria = "#F5F5F5";
        }
    }

    public void atualizarEquipe(@Valid DadosAtualizarEquipe dados) {
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }

        if (isValidHexColor(dados.corPrimaria()) == true) {
            this.corPrimaria = dados.corPrimaria();
        
        } else if (dados.corPrimaria() != null){
            this.corPrimaria = "#D9D9D9";
        }

        if (isValidHexColor(dados.corSecundaria()) == true) {
            this.corSecundaria = dados.corSecundaria();
        
        } else  if (dados.corSecundaria() != null) {
            this.corSecundaria = "#F5F5F5";
        }

        this.ativo = dados.ativo();
    }

    public void desativarEquipe() {
        this.ativo = false;
    }

    public static boolean isValidHexColor(String color) {
        String hexColorPattern = "^#([a-fA-F0-9]{6})$";
        
        return color != null && color.matches(hexColorPattern);
    }
}
