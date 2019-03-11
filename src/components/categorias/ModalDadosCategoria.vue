<template>
  <div>
    <b-button class="mt-3" variant="success" v-on:click="showModal(); categorias.nova()">
      <fa-icon icon="plus"/> Nova Categoria
    </b-button>
    <b-modal
      v-model="categorias.modalDadosVisivel"
      ref="modalDadosRef"
      title="Dados Categoria"
      :header-bg-variant="'success'"
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
        <b-form-group label="Descrição">
          <b-form-input
            type="text"
            v-model="categorias.categoria.descricao"
            :state="categorias.categoria.descricao != null && categorias.categoria.descricao != ''"
          ></b-form-input>
        </b-form-group>
      </form>
      <div slot="modal-footer" class="float-right btn-toolbar">
        <b-btn size="sm" class="mr-2" @click="hideModal">Fechar</b-btn>
        <b-btn
          size="sm"
          variant="success"
          v-on:click="categorias.salvar(categorias.categoria)"
          v-bind:disabled="formInvalid"
        >Salvar</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalDadosCategoria",
  props: ["categorias"],
  computed: {
    formInvalid() {
      if (
        this.categorias.categoria.descricao == "" ||
        this.categorias.categoria.descricao == null
      )
        return true;
    }
  },
  methods: {
    showModal() {
      this.categorias.modalDadosVisivel = true;
    },
    hideModal() {
      this.categorias.modalDadosVisivel = false;
    }
  }
};
</script>