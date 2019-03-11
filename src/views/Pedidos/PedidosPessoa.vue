 <template>
  <div id="app" class="container" style="margin-top: 30px;">
    <div class="card">
      <div class="card-header">
        <h5>Meus Pedidos</h5>
      </div>
      <div class="card-body">
        <table class="table" style="margin-top: 15px">
          <thead>
            <tr>
              <th></th>
              <th>Código</th>
              <th>Data Pedido</th>
              <th>Valor Total(R$)</th>
            </tr>
          </thead>
          <tbody v-show="pedidos.pedidosPessoa.length == 0" class="text-center">
            <tr>
              <td colspan="4">
                <em>Nenhum pedido encontrado.</em>
              </td>
            </tr>
          </tbody>
          <tbody v-for="pedido in pedidos.pedidosPessoa" :key="pedido.idPedido">
            <tr>
              <td>
                <button
                  type="button"
                  class="btn btn-default"
                  style="border-color:black"
                  @click="pedido.visivel = !pedido.visivel"
                  :aria-controls="'collapse'+ pedido.idPedido"
                  :aria-expanded="pedido.visivel ? 'true' : 'false'"
                >
                  <fa-icon v-show="!pedido.visivel" icon="chevron-down"/>
                  <fa-icon v-show="pedido.visivel" icon="chevron-up"/>
                </button>
              </td>
              <td>{{pedido.idPedido}}</td>
              <td>{{pedido.dataPedido}}</td>
              <td>{{pedido.valorTotal}}</td>
            </tr>
            <tr v-show="pedido.visivel">
              <td colspan="4">
                <b-collapse v-model="pedido.visivel" class="mt-2" :id="'collapse' + pedido.idPedido">
                  <table class="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in pedido.itens" :key="item.id">
                        <td>{{item.descricao}}</td>
                        <td>{{item.preco}}</td>
                        <td>{{item.quantidade}}</td>
                        <td>{{item.subtotal}}</td>
                      </tr>
                    </tbody>
                  </table>
                </b-collapse>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { storePedidos } from "@/store/StorePedidos.js";

export default {
  name: "PedidosPessoa",
  components: {},
  data: function() {
    return {
      pedidos: storePedidos.state
    };
  },
  created() {
    this.pedidos.pedidosDaPessoa();
  }
};
</script>
