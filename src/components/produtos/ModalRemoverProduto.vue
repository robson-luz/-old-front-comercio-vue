<template>
  <div>
    <b-modal
      v-model="produtos.modalRemoverVisivel"
      ref="modalDadosRef"
      title="Remover Produto"
      :header-bg-variant="'danger'"
      :header-text-variant="'light'"
    >
      <div>
        <b-alert
          variant="danger"
          v-bind:show="produtos.erros.length > 0"
          @dismissed="produtos.erros = []"
          dismissible
        >
          <p v-for="(erro, index) in produtos.erros" :key="index">{{erro}}</p>
        </b-alert>
      </div>
      <form>
        <div>
          <p>
            Deseja realmente remover o produto
            <b>{{produtos.produto.descricao}}</b>?
          </p>
        </div>
      </form>
      <div slot="modal-footer" class="float-right btn-toolbar">
        <b-btn size="sm" class="mr-2" @click="hideModal">Fechar</b-btn>
        <b-btn size="sm" variant="danger" v-on:click="produtos.remover(produtos.produto)">Remover</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalRemoverProduto",
  props: ["produtos"],
  methods: {
    showModal() {
      this.produtos.modalRemoverVisivel = true;
    },
    hideModal() {
      this.produtos.modalRemoverVisivel = false;
    }
  }
};
</script>