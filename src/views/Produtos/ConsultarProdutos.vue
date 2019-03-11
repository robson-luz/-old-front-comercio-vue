 <template>
  <div id="app" class="container" style="margin-top: 30px;">
    <div class="card">
      <div class="card-header">
        <h5>Produtos</h5>
      </div>
      <div class="card-body">
        <b-alert
          variant="success"
          v-bind:show="produtos.info != ''"
          @dismissed="produtos.info = ''"
          dismissible
        >
          <p>{{produtos.info}}</p>
        </b-alert>
        <div>
          <h4>
            <fa-icon icon="search"/>Filtro
          </h4>
        </div>
        <div class="card">
          <div class="card-body">
            <div>
              <div class="row">
                <div class="col-md-6">
                  <label>Descrição</label>
                  <div class="form-group">
                    <input class="form-control" type="text" v-model="produtos.filtro.descricao">
                  </div>
                </div>

                <div class="col-md-6">
                  <label>Categoria</label>
                  <div class="form-group">
                    <select class="form-control" v-model="produtos.filtro.idCategoria">
                      <option :value="undefined">Selecione</option>
                      <option
                        v-for="categoria in produtos.categorias"
                        v-bind:value="categoria.idCategoria"
                        :key="categoria.id"
                      >{{categoria.descricao}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <b-button class="mr-2" variant="primary" v-on:click="produtos.cadastrados()">Buscar</b-button>

                <b-button variant="warning" v-on:click="produtos.limparFiltro()">Limpar Filtro</b-button>
              </div>
            </div>
          </div>
        </div>

        <modalDadosProduto :produtos="produtos"/>
        <modalRemoverProduto :produtos="produtos"/>

        <table class="table" style="margin-top: 15px">
          <thead>
            <tr>
              <th>#</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody v-show="produtos.produtos.length == 0" class="text-center">
            <tr>
              <td colspan="5">
                <em>Nenhum produto encontrado.</em>
              </td>
            </tr>
          </tbody>
          <tbody v-show="produtos.produtos.length > 0">
            <tr v-for="produto in produtos.produtos" :key="produto.id">
              <td>{{produto.idProduto}}</td>
              <td>{{produto.descricao}}</td>
              <td>{{produto.categoria}}</td>
              <td>{{produto.preco}}</td>
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-primary"
                  v-on:click="produtos.selecionar(produto); produtos.modalDadosVisivel = true"
                  v-b-tooltip
                  title="Editar"
                >
                  <fa-icon icon="pencil-alt"/>
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  style="margin-left: 5px"
                  v-on:click="produtos.selecionar(produto); produtos.modalRemoverVisivel = true"
                  v-b-tooltip
                  title="Remover"
                >
                  <fa-icon icon="trash-alt"/>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot v-show="produtos.produtos.length > 0">
            <tr>
              <td colspan="5">
                <b-pagination
                  align="center"
                  v-model="produtos.filtro.paginacao.inicio"
                  v-on:input="produtos.cadastrados()"
                  v-bind:per-page="produtos.filtro.paginacao.limite"
                  v-bind:total-rows="produtos.filtro.paginacao.totalRegistros"
                ></b-pagination>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { storeProdutos } from "@/store/StoreProdutos.js";
import modalDadosProduto from "@/components/produtos/ModalDadosProduto.vue";
import modalRemoverProduto from "@/components/produtos/ModalRemoverProduto.vue";

export default {
  name: "ProdutosConsultar",
  components: {
    modalDadosProduto,
    modalRemoverProduto
  },
  data: function() {
    return {
      produtos: storeProdutos.state
    };
  },
  created() {
    this.produtos.todasCategorias();
  }
};
</script>
