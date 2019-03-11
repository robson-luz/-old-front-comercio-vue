import PessoasService from "@/services/PessoasService";
import { usuarioOnline } from "@/helpers/usuarioOnline";

export const storePessoas = {
    components: {},
    state: {
        pessoa: {},
        info: "",
        erros: [],
        dadosPessoa: {},
        modalUsuarioVisivel: false,
        nova() {
            this.info = "";
            this.erros = [];

            this.pessoa = {};
            this.pessoa.arquivo = "";
            this.pessoa.tipoPessoa = 'C';
        },
        selecionar(pessoa) {
            this.pessoa = {
                ...pessoa
            };
        },
        cadastrar(pessoa) {
            PessoasService
                .cadastrar(pessoa)
                .then(response => {
                    this.info = response.value.info;
                    alert(this.info);

                    this.modalUsuarioVisivel = false;
                    this.pessoa = {};
                })
                .catch(e => {
                    this.erros = e.response.data.value.errorMessage;
                });
        },
        detalhes() {
            let idPessoa = usuarioOnline.state.idPessoa;

            PessoasService
                .detalhes(idPessoa)
                .then(response => {

                    // this.$set(this.pessoa, 'dadosPessoa', response.dadosPessoa);
                    this.dadosPessoa = response.dadosPessoa;

                    if (this.dadosPessoa.arquivo != null) {
                        this.dadosPessoa.arquivo = "data:image;base64," + this.dadosPessoa.arquivo;
                    }
                })
        }
    }
};