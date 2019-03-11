import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login/Login.vue'
import Categorias from '../views/Categorias/ConsultarCategorias.vue'
import Produtos from '../views/Produtos/ConsultarProdutos.vue'
import Pedidos from '../views/Pedidos/FazerPedido.vue'
import PedidosPessoa from '../views/Pedidos/PedidosPessoa.vue'
import DadosPessoa from '../views/Pessoas/DadosPessoa.vue'

import { usuarioOnline } from "@/helpers/usuarioOnline";

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Index ,    
        children: [
        { path: 'Comercio/Home', component: Home },
        { path: 'Comercio/Categorias', component: Categorias },
        { path: 'Comercio/Produtos', component: Produtos },
        { path: 'Comercio/Pedidos', component: Pedidos },
        { path: 'Comercio/PedidosPessoa', component: PedidosPessoa },
        { path: 'Comercio/DadosPessoa', component: DadosPessoa },
      ]
    },
    { path: '/Login', component: Login },
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirecionar para login se não estiver logado
  const paginasPublicas = ['/Login'];
  const requerAutorizacao = !paginasPublicas.includes(to.path);

  const logado = $cookies.isKey('tokenComercioCore');

  if (requerAutorizacao && !logado) {
    usuarioOnline.state.resetar();    
    
    router.go();
    return next('/Login');
  } else {
    next();
  }
});