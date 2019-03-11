<template>
  <div>
    <b-modal
      v-model="pessoas.modalUsuarioVisivel"
      ref="modalUsuarioRef"
      title="Cadastrar Usuário"
      :header-bg-variant="'success'"
      :header-text-variant="'light'"
    >
      <div>
        <b-alert
          variant="danger"
          v-bind:show="pessoas.erros.length > 0"
          @dismissed="pessoas.erros = []"
          dismissible
        >
          <p v-for="(erro, index) in pessoas.erros" :key="index">{{erro}}</p>
        </b-alert>
      </div>
      <form>
        <b-form-group class="text-center">
          <uploadImagem :imageData="pessoas.pessoa.foto" @uploaded="onUploadImagem"/>
        </b-form-group>

        <b-form-group label="Nome">
          <b-form-input
            type="text"
            v-model="pessoas.pessoa.nome"
            :state="pessoas.pessoa.nome != null && pessoas.pessoa.nome != ''"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="CPF">
          <b-form-input
            v-mask="'###.###.###-##'"
            v-model="pessoas.pessoa.cpf"
            :state="pessoas.pessoa.cpf != null && pessoas.pessoa.cpf != ''"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="E-mail">
          <b-form-input
            type="text"
            v-model="pessoas.pessoa.email"
            :state="pessoas.pessoa.email != null && pessoas.pessoa.email != ''"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Número Celular">
          <b-form-input v-mask="'(##)#####-####'" v-model="pessoas.pessoa.numeroCelular"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group label="Login">
          <b-form-input
            v-model="pessoas.pessoa.login"
            :state="pessoas.pessoa.login != null && pessoas.pessoa.login != ''"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Senha">
          <b-form-input
            type="password"
            v-model="pessoas.pessoa.senha"
            :state="pessoas.pessoa.senha != null && pessoas.pessoa.senha != ''"
          ></b-form-input>
        </b-form-group>
      </form>
      <div slot="modal-footer" class="float-right btn-toolbar">
        <b-btn size="sm" class="mr-2" @click="hideModal">Fechar</b-btn>
        <b-btn
          size="sm"
          variant="success"
          v-on:click="pessoas.cadastrar(pessoas.pessoa)"
          v-bind:disabled="formInvalid"
        >Salvar</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import uploadImagem from "@/components/UploadImagem.vue";

export default {
  name: "ModalNovoUsuario",
  props: ["pessoas"],
  directives: { mask },
  components: {
    uploadImagem
  },
  computed: {
    formInvalid() {
      if (
        this.pessoas.pessoa.nome == "" ||
        this.pessoas.pessoa.nome == null ||
        this.pessoas.pessoa.cpf == "" ||
        this.pessoas.pessoa.cpf == null ||
        this.pessoas.pessoa.email == "" ||
        this.pessoas.pessoa.email == null ||
        this.pessoas.pessoa.login == "" ||
        this.pessoas.pessoa.login == null ||
        this.pessoas.pessoa.senha == "" ||
        this.pessoas.pessoa.senha == null
      )
        return true;
    }
  },
  methods: {
    showModal() {
      this.pessoas.modalUsuarioVisivel = true;
    },
    hideModal() {
      this.pessoas.modalUsuarioVisivel = false;
    },
    onUploadImagem(dados) {
      this.pessoas.pessoa.arquivo = dados.arquivo;
      this.pessoas.pessoa.foto = dados.foto;
    }
  }
};
</script>