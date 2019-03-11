import Vue from 'vue'
import App from './App.vue'
import { router } from './helpers/router'
import VueCookies from 'vue-cookies'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

import VueElementLoading from "vue-element-loading";

Vue.component("VueElementLoading", VueElementLoading);

library.add(faPencilAlt, faPlus, faMinus, faTrashAlt, faSearch, faUser, faKey, faCartPlus, faChevronDown, faChevronUp, faFolderOpen);

Vue.use(BootstrapVue);
Vue.component('fa-icon', FontAwesomeIcon);

Vue.use(VueCookies);
VueCookies.config('30min');
VueCookies.set('theme','default');
VueCookies.set('hover-time','1s');

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
