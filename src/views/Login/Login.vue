<template>
	<div class="container h-100">
    <modalNovoUsuario :pessoas="pessoas"/>

		<div class="d-flex justify-content-center h-100">
			<div class="user_card">
                <b-alert
                    variant="danger"
                    v-bind:show="app.errosLogin.length > 0"
                    @dismissed="app.errosLogin = []"
                    dismissible
                >
                    <p v-for="(erro, index) in app.errosLogin" :key="index">{{erro}}</p>
                </b-alert>

				<div class="d-flex justify-content-center form_container">                    
          <div class="brand_logo_container">
						<img alt="Logo" src="@/assets/logo.png" class="brand_logo">
					</div>

					<form>
						<div class="input-group mb-3">
							<div class="input-group-append">
								<span class="input-group-text">
                  <fa-icon icon="user"/>
                </span>
							</div>
							<input v-model="usuario" type="text" class="form-control input_user" placeholder="Usuário">
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text">
                  <fa-icon icon="key"/>
                </span>
							</div>
							<input v-model="senha" type="password" class="form-control input_pass" placeholder="Senha">
						</div>
						<div class="form-group">
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customControlInline">
								<label class="custom-control-label" for="customControlInline">Lembrar</label>
							</div>
						</div>
          <div class="d-flex justify-content-center mt-3 login_container">
					  <button type="button" class="btn login_btn" v-on:click="app.iniciarSessao(usuario, senha)" v-bind:disabled="formInvalid">Login</button>
				  </div>
					</form>
				</div>

				<div class="mt-4">
					<div class="d-flex justify-content-center links">
						<a href="#" class="ml-2" v-on:click="pessoas.modalUsuarioVisivel = true; pessoas.nova()">Cadastre-se</a>            
					</div>
					<div class="d-flex justify-content-center links">
						<a href="#">Esqueceu a senha?</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { storeApp } from "@/store/StoreApp.js";
import { storePessoas } from "@/store/StorePessoas.js";
import modalNovoUsuario from "@/components/pessoas/ModalNovoUsuario.vue";

export default {
  name: "Login",
  components: {
    modalNovoUsuario,
  },
  data() {
    return {
      app: storeApp.state,
      pessoas: storePessoas.state,
      usuario: "",
      senha: ""
    };
  },
  computed: {
    formInvalid() {
      if (
        this.usuario == "" ||
        this.senha == ""
      )
        return true;
    }
  },
};
</script>

<style scoped>
body,
html {
  padding: 0;
  height: 100%;
}

html body {
  background-color: #bef0d942;
}

a {
  color: seagreen !important;
}

.alert {
  margin-top: 100px;
  margin-bottom: -60px !important;
}

.user_card {
  height: auto;
  width: 350px;
  margin-top: 150px;
  margin-bottom: auto;
  background: #ffffff;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.brand_logo_container {
  position: absolute;
  height: 170px;
  width: 170px;
  top: -65px;
  border-radius: 50%;
  padding: 10px;
  text-align: center;
}
.brand_logo {
  height: 150px;
  width: 150px;
  /* border-radius: 50%;
  border: 2px solid white; */
}
.form_container {
  margin-top: 100px;
}
.login_btn {
  width: 100%;
  background: #41b883 !important;
  color: white !important;
}
.login_btn:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.login_container {
  padding: 0 2rem;
}
.input-group-text {
  background: #41b883 !important;
  color: white !important;
  border: 0 !important;
  border-radius: 0.25rem 0 0 0.25rem !important;
}
.input_user,
.input_pass:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #41b883 !important;
}
</style>