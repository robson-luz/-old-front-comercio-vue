<template>
  <div id="app">
    <vue-element-loading
      v-bind:active="loading"
      spinner="bar-fade-scale"
      color="#FF6700"
      is-full-screen
    />

    <router-view></router-view>
  </div>
</template>

<script>
import api from "@/helpers/apiRequest.js";
import { storeApp } from "@/store/StoreApp.js";
import { router } from '@/helpers/router';

export default {
  name: "App",
  data() {
    return {
      app: storeApp.state,
      loading: false
    };
  },
  methods: {
    setLoading(loading) {
      this.loading = loading;
    }
  },
  created() {
    api.interceptors().request.use(
      config => {
        this.setLoading(true);

        // if (!$cookies.get("tokenComercioCore")) {
        //   console.log('teste');
        //   router.go();
        // }

        return config;
      },
      error => {
        this.setLoading(false);
        return Promise.reject(error);
      }
    );

    api.interceptors().response.use(
      config => {
        this.setLoading(false);
        return config;
      },
      error => {
        this.setLoading(false);
        return Promise.reject(error);
      }
    );
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav_collapse a {
  font-weight: bold;
  color: #ffffff;
}

#nav_collapse a.router-link-exact-active {
  color: #135623;
}

#nav_dropdown a {
  font-weight: bold;
  color: #135623;
}

table {
  width: 100%;
}

table thead {
  background-color: #222;
  color: white;
}

table td,
button {
  margin-right: 3px;
}
</style>
