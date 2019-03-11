import ProdutosService from "@/services/ProdutosService";
import CategoriasService from "@/services/CategoriasService";

export const storeProdutos = {
    state: {        
        filtro: {
            paginacao: {
                inicio: 0,
                limite: 5,
                totalRegistros: 0
            }
        },
        loading: false,
        produtos: [],
        produto: {},
        info: "",
        erros: [],
        modalDadosVisivel: false,
        modalRemoverVisivel: false,
        novo() {
            this.info = "";
            this.erros = [];

            this.produto = {};
            this.produto.arquivo = "";
        },
        limparFiltro() {
            this.filtro.descricao = "";
            delete this.filtro.idCategoria ;

            this.cadastrados();
        },
        selecionar(produto) {
            this.produto = { ...produto };

            if (this.produto.arquivo != null) {
                this.produto.foto = "data:image;base64," + this.produto.arquivo;
            }
        },
        todasCategorias() {
            CategoriasService.todas()
                .then(response => {
                    this.categorias = response.data.categorias;                    
                });
        },
        cadastrados() {
            ProdutosService.cadastrados(this.filtro)
                .then(response => {
                    this.produtos = response.produtos;
                    this.filtro.paginacao = response.paginacao;
                });
        },
        salvar(produto) {
            ProdutosService.salvar(produto)
                .then(response => {
                    this.info = response.value.info;

                    this.modalDadosVisivel = false;
                    this.cadastrados();
                })
                .catch(e => {
                    this.erros = e.response.data.value.errorMessage;
                });
        },
        remover(produto) {
            ProdutosService.remover(produto)
                .then(response => {
                    this.info = response.value.info;;

                    this.modalRemoverVisivel = false;
                    this.cadastrados();
                })
                .catch(e => {
                    this.erros = e.response.data.value.errorMessage;
                });
        }
    }
};