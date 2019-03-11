import PedidosService from "@/services/PedidosService";
import ProdutosService from "@/services/ProdutosService";
import CategoriasService from "@/services/CategoriasService";

import { usuarioOnline } from "@/helpers/usuarioOnline";

export const storePedidos = {
    state: {
        modalFinalizarVisivel: false,
        filtro: {
            paginacao: {
                inicio: 0,
                limite: 8,
                totalRegistros: 0
            }
        },
        pedido: {
            total: 0,
            itens: []
        },
        categorias: [],
        produtos: [],
        produto: {},
        info: "",
        erros: [],
        pedidosPessoa: {},
        limparFiltro() {
            this.filtro.descricao = "";
            delete this.filtro.idCategoria;

            this.consultarProdutos();
        },
        adicionarItem(item) {
            item.quantidade = 1;
            item.subtotal = item.preco;
            this.pedido.total += item.preco;

            this.pedido.itens.push(item);
        },
        removerItem(item) {
            let index = this.pedido.itens.indexOf(item);

            this.pedido.total -= item.subtotal;
            this.pedido.itens.splice(index, 1);
        },
        consultarProdutos() {
            ProdutosService.cadastrados(this.filtro)
                .then(response => {
                    this.produtos = response.produtos;
                    this.filtro.paginacao = response.paginacao;
                });
        },
        cadastrar() {
            this.pedido.idPessoa = usuarioOnline.state.idPessoa

            PedidosService.cadastrar(this.pedido)
                .then(response => {
                    this.info = response.value.info;

                    this.modalFinalizarVisivel = false;
                    this.pedido = {
                        total: 0,
                        itens: []
                    };
                })
                .catch(e => {
                    this.erros = e.response.data.value.errorMessage;
                });
        },
        pedidosDaPessoa() {
            let idPessoa = usuarioOnline.state.idPessoa;

            PedidosService.daPessoa(idPessoa)
                .then(response => {
                    this.pedidosPessoa = response.pedidos;
                });
        },
        contemItem(item) {
            //return this.pedido.itens.includes(item);
            for (let i = 0; i < this.pedido.itens.length; i++) {
                let itemAtual = this.pedido.itens[i];

                if (itemAtual.idProduto === item.idProduto)
                    return true;
            }
            return false;
        },
        todasCategorias() {
            CategoriasService.todas()
                .then(response => {
                    this.categorias = response.data.categorias;        
                });
        },
    }
};