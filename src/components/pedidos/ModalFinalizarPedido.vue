<template>
  <div>
    <b-button
      class="mt-3"
      variant="success"
      v-on:click="showModal()"
      v-bind:disabled="pedidos.pedido.itens.length <= 0"
    >
      <fa-icon icon="cart-plus"/> Finalizar Pedido
    </b-button>
    <b-modal
      v-model="pedidos.modalFinalizarVisivel"
      size="lg"
      ref="modalFinalizarRef"
      title="Finalizar Pedido"
      :header-bg-variant="'success'"
      :header-text-variant="'light'"
    >
      <div>
        <b-alert
          variant="danger"
          v-bind:show="pedidos.erros.length > 0"
          @dismissed="pedidos.erros = []"
          dismissible
        >
          <p v-for="(erro, index) in pedidos.erros" :key="index">{{erro}}</p>
        </b-alert>
      </div>

      <form>
        <table class="table" style="margin-top: 15px">
          <thead style="background-color:white !important; color: black !important">
            <tr>
              <th>Descrição</th>
              <th>Preço(R$)</th>
              <th class="text-center">Quantidade</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pedidos.pedido.itens" :key="item.idProduto">
              <td>{{item.descricao}}</td>
              <td>{{item.preco.toFixed(2)}}</td>
              <td>
                <div class="row" style="margin-left:50px">
                  <div>
                    <button
                      type="button"
                      class="btn btn-sm"
                      style="margin-left: 5px"
                      v-on:click="diminuirQuantidade(item)"
                    >
                      <fa-icon icon="minus"/>
                    </button>
                  </div>
                  <div style="margin-left:5px">
                    <div class="form-control">{{item.quantidade}}</div>
                  </div>
                  <div>
                    <button
                      type="button"
                      class="btn btn-sm"
                      style="margin-left: 5px"
                      v-on:click="aumentarQuantidade(item)"
                    >
                      <fa-icon icon="plus"/>
                    </button>
                  </div>
                </div>
              </td>
              <td>{{item.subtotal.toFixed(2)}}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  style="margin-left: 5px"
                  v-on:click="pedidos.removerItem(item)"
                >
                  <fa-icon icon="trash-alt"/>
                </button>
              </td>
            </tr>
            <tr>
              <td class="pull-left" colspan="3">Total</td>
              <td class="pull-left" colspan="2">{{pedidos.pedido.total.toFixed(2)}}</td>
            </tr>
          </tbody>
        </table>
      </form>
      <div slot="modal-footer" class="float-right btn-toolbar">
        <b-btn size="sm" class="mr-2" @click="hideModal">Fechar</b-btn>
        <b-btn v-show="pedidos.pedido.itens.length > 0" size="sm" variant="success" v-on:click="pedidos.cadastrar()">Finalizar</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalFinalizarPedido",
  props: ["pedidos"],
  data: function() {
    return {};
  },
  methods: {
    showModal() {
      this.pedidos.modalFinalizarVisivel = true;
    },
    hideModal() {
      this.pedidos.modalFinalizarVisivel = false;
    },
    aumentarQuantidade(item) {
      // this.$set(item, "quantidade", item.quantidade + 1);
      item.quantidade++;
      item.subtotal += item.preco;
      this.pedidos.pedido.total += item.preco;
      this.$forceUpdate();
    },
    diminuirQuantidade(item) {
      if (item.quantidade > 1) {
        item.quantidade--;
        item.subtotal -= item.preco;
        this.pedidos.pedido.total -= item.preco;
        this.$forceUpdate();
      }
    }
  }
};
</script>