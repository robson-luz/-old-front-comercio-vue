<template>
  <div>
    <b-modal
      v-model="categorias.modalRemoverVisivel"
      ref="modalDadosRef"
      title="Remover Categoria"
      :header-bg-variant="'danger'"
      :header-text-variant="'light'"
    >
      <div>
        <b-alert
          variant="danger"
          v-bind:show="categorias.erros.length > 0"
          @dismissed="categorias.erros = []"
          dismissible
        >
          <p v-for="(erro, index) in categorias.erros" :key="index">{{erro}}</p>
        </b-alert>
      </div>
      <form>
        <div>
          <p>
            Deseja realmente remover a categoria
            <b>{{categorias.categoria.descricao}}</b>?
          </p>
        </div>
      </form>
      <div slot="modal-footer" class="float-right btn-toolbar">
        <b-btn size="sm" class="mr-2" @click="hideModal">Fechar</b-btn>
        <b-btn size="sm" variant="danger" v-on:click="categorias.remover(categorias.categoria)">Remover</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalRemoverCategoria",
  props: ["categorias"],
  methods: {
    showModal() {
      this.categorias.modalRemoverVisivel = true;
    },
    hideModal() {
      this.categorias.modalRemoverVisivel = false;
    }
  }
};
</script>