 <template>
  <div id="app" class="container" style="margin-top: 30px;">
    <div class="card">
      <div class="card-header">
        <h5>Fazer Pedido</h5>
      </div>
      <div class="card-body">
        <b-alert
          variant="success"
          v-bind:show="pedidos.info != ''"
          @dismissed="pedidos.info = ''"
          dismissible
        >
          <p>{{pedidos.info}}</p>
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
                    <input class="form-control" type="text" v-model="pedidos.filtro.descricao">
                  </div>
                </div>

                <div class="col-md-6">
                  <label>Categoria</label>
                  <div class="form-group">
                    <select class="form-control" v-model="pedidos.filtro.idCategoria">
                      <option :value="undefined">Selecione</option>
                      <option
                        v-for="categoria in pedidos.categorias"
                        v-bind:value="categoria.idCategoria"
                        :key="categoria.id"
                      >{{categoria.descricao}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <b-button
                  class="mr-2"
                  variant="primary"
                  v-on:click="pedidos.consultarProdutos()"
                >Buscar</b-button>

                <b-button variant="warning" v-on:click="pedidos.limparFiltro()">Limpar Filtro</b-button>
              </div>
            </div>
          </div>
        </div>

        <modalFinalizarPedido :pedidos="pedidos"/>

        <div class="container">
          <div class="row">
            <div
              class="col-lg-3 col-md-3 mb-3"
              v-for="produto in pedidos.produtos"
              :key="produto.id"
            >
              <div class="card" style="height: 325px; width: 200px; margin-top: 15px; margin-left: 10px">
                <a>
                  <img v-if="produto.arquivo != null" class="card-img-top image-display" :src="'data:image;base64,' + produto.arquivo" alt>
                  <img v-else class="card-img-top image-display" src="@/assets/shop-placeholder.png" alt>
                </a>
                <div class="card-body">
                  <h6 class="card-title">
                    <b>{{produto.descricao}}</b>
                  </h6>
                  <span>R$ {{produto.preco.toFixed(2)}}</span>
                  <p class="text-center">
                    <button
                      type="button"
                      class="btn btn-sm btn-success"
                      style="margin-top: 10px"
                      v-on:click="pedidos.adicionarItem(produto)"
                      v-bind:disabled="pedidos.contemItem(produto)"
                    >
                      <fa-icon icon="cart-plus"/>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer" class="container-fluid" v-show="pedidos.produtos.length > 0">
          <b-pagination
            align="center"
            v-model="pedidos.filtro.paginacao.inicio"
            v-on:input="pedidos.consultarProdutos()"
            v-bind:per-page="pedidos.filtro.paginacao.limite"
            v-bind:total-rows="pedidos.filtro.paginacao.totalRegistros"
          ></b-pagination>
        </div>

        <!-- <table class="table" style="margin-top: 15px">
          <thead>
            <tr>
              <th>#</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody v-show="pedidos.produtos.length == 0" class="text-center">
            <tr>
              <td colspan="5">
                <em>Nenhum produto encontrado.</em>
              </td>
            </tr>
          </tbody>
          <tbody v-show="pedidos.produtos.length > 0">
            <tr v-for="produto in pedidos.produtos" :key="produto.id">
              <td>{{produto.idProduto}}</td>
              <td>{{produto.descricao}}</td>
              <td>{{produto.categoria}}</td>
              <td>{{produto.preco}}</td>
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-sm btn-success"
                  style="margin-left: 5px"
                  v-on:click="pedidos.adicionarItem(produto)"
                  v-bind:disabled="pedidos.contemItem(produto)"
                >
                  <fa-icon icon="cart-plus"/>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot v-show="pedidos.produtos.length > 0">
            <tr>
              <td colspan="5">
                <b-pagination
                  align="center"
                  v-model="pedidos.filtro.paginacao.inicio"
                  v-on:input="pedidos.consultarProdutos()"
                  v-bind:per-page="pedidos.filtro.paginacao.limite"
                  v-bind:total-rows="pedidos.filtro.paginacao.totalRegistros"
                ></b-pagination>
              </td>
            </tr>
          </tfoot>
        </table>-->
      </div>
    </div>
  </div>
</template>

<script>
import modalFinalizarPedido from "@/components/pedidos/ModalFinalizarPedido.vue";
import { storePedidos } from "@/store/StorePedidos.js";

export default {
  name: "FazerPedido",
  components: {
    modalFinalizarPedido
  },
  data: function() {
    return {
      pedidos: storePedidos.state
    };
  },
  created() {
    this.pedidos.todasCategorias();
  }
};
</script>
