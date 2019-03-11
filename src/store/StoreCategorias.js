import CategoriasService from "@/services/CategoriasService";

export const storeCategorias = {
    components: {
    },
    state: {
        filtro: {
            paginacao: {
                inicio: 0,
                limite: 5,
                totalRegistros: 0
            }
        },
        loading: false,
        categorias: [],
        categoria: {},
        info: "",
        erros: [],
        modalDadosVisivel: false,
        modalRemoverVisivel: false,
        nova() {
            this.info = "";
            this.erros = [];

            this.categoria = {};
        },
        limparFiltro() {
            this.filtro.descricao = "";

            this.cadastradas();
        },
        selecionar(categoria) {
            this.categoria = { ...categoria };
        },
        cadastradas() {
            CategoriasService
                .cadastradas(this.filtro)
                .then(response => {
                    this.categorias = response.categorias;
                    this.filtro.paginacao = response.paginacao;
                });
        },
        salvar(categoria) {
            CategoriasService
                .salvar(categoria)
                .then(response => {
                    this.info = response.value.info;

                    this.modalDadosVisivel = false;
                    this.cadastradas();
                })
                .catch(e => {
                    this.erros = e.response.data.value.errorMessage;
                });
        },
        remover(categoria) {
            CategoriasService
                .remover(categoria)
                .then(response => {
                    this.info = response.value.info;

                    this.modalRemoverVisivel = false;
                    this.cadastradas();
                })
                .catch(e => {
                    this.erros = e.response.data.value.errorMessage;
                });
        }
    }
};