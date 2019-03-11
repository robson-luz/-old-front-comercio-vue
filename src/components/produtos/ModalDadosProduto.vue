<template>
  <div>
    <b-button class="mt-3" variant="success" v-on:click="showModal(); produtos.novo()">
      <fa-icon icon="plus"/> Novo Produto
    </b-button>
    <b-modal
      v-model="produtos.modalDadosVisivel"
      ref="modalDadosRef"
      title="Dados Produto"
      :header-bg-variant="'success'"
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
        <b-form-group class="text-center">
          <uploadImagem :imageData="produtos.produto.foto" @uploaded="onUploadImagem"/>
        </b-form-group>

        <b-form-group label="Descrição">
          <b-form-input
            type="text"
            v-model="produtos.produto.descricao"
            :state="produtos.produto.descricao != null && produtos.produto.descricao != ''"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Preço">
          <b-form-input
            type="number"
            v-model="produtos.produto.preco"
            :state="produtos.produto.preco != null && produtos.produto.preco > 0"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Categoria">
          <b-form-select
            v-model="produtos.produto.idCategoria"
            :state="produtos.produto.idCategoria != null && produtos.produto.idCateogria != 0"
            class="mb-3"
          >
            <option :value="undefined">Selecione</option>
            <option
              v-for="categoria in produtos.categorias"
              v-bind:value="categoria.idCategoria"
              :key="categoria.id"
            >{{categoria.descricao}}</option>
          </b-form-select>
        </b-form-group>
      </form>
      <div slot="modal-footer" class="float-right btn-toolbar">
        <b-btn size="sm" class="mr-2" @click="hideModal">Fechar</b-btn>
        <b-btn
          size="sm"
          variant="success"
          v-on:click="produtos.salvar(produtos.produto)"
          v-bind:disabled="formInvalid"
        >Salvar</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import uploadImagem from "@/components/UploadImagem.vue";

export default {
  name: "ModalDadosProduto",
  props: ["produtos"],
  components: {
    uploadImagem
  },
  computed: {
    formInvalid() {
      if (
        this.produtos.produto.descricao == "" ||
        this.produtos.produto.descricao == null ||
        this.produtos.produto.preco <= 0 ||
        this.produtos.produto.preco == null ||
        this.produtos.produto.idCategoria == null
      )
        return true;
    }
  },
  methods: {
    showModal() {
      this.produtos.modalDadosVisivel = true;
    },
    hideModal() {
      this.produtos.modalDadosVisivel = false;
    },
    onUploadImagem(dados) {
      this.produtos.produto.arquivo = dados.arquivo;
      this.produtos.produto.foto = dados.foto;
    }
  }
};
</script>