<template>
  <div>
    <b-navbar style="background-color: seagreen" toggleable="md" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand><router-link style="color: white" to="/Comercio/Home">Comércio</router-link></b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown>
            <template slot="button-content">
              <span>Cadastros</span>
            </template>
            <b-dropdown-item>
              <router-link style="color: green" to="/Comercio/Categorias">Categorias</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link style="color: green" to="/Comercio/Produtos">Produtos</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item>
            <router-link to="/Comercio/Pedidos">Fazer Pedido</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <div>
            <img v-if="usuario.arquivo != null" class="thumbnail" :src="usuario.arquivo">
            <img v-else class="thumbnail" src="@/assets/user-placeholder.png">
          </div>
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>
                <span>{{usuario.nome}}</span>
              </em>
            </template>
            <b-dropdown-item style="color: green" href="#">
              <router-link style="color: green" to="/Comercio/DadosPessoa">Dados Pessoais</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link style="color: green" to="/Comercio/PedidosPessoa">Meus Pedidos</router-link>
            </b-dropdown-item>
            <b-dropdown-item style="color: green" v-on:click="app.finalizarSessao()">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view></router-view>
  </div>
</template>

<script>
import { storeApp } from "@/store/StoreApp.js";
import { usuarioOnline } from "@/helpers/usuarioOnline";

export default {
  name: "Index",
  data() {
    return {
      app: storeApp.state,
      usuario: usuarioOnline.state
    };
  },
  created() {
    if ($cookies.get("tokenComercioCore")) {
      storeApp.state.manterSessao();
    }
  }
};
</script>
