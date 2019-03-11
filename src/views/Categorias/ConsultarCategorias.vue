 <template>
  <div id="app" class="container" style="margin-top: 30px;">
    <div class="card">
      <div class="card-header">
        <h5>Categorias</h5>
      </div>
      <div class="card-body">
          
        <b-alert
          variant="success"
          v-bind:show="categorias.info != ''"
          @dismissed="categorias.info = ''"
          dismissible
        >
          <p>{{categorias.info}}</p>
        </b-alert>
        <div>
          <h4>
            <fa-icon icon="search"/>Filtro
          </h4>
        </div>
        <div class="card">
          <div class="card-body">
            <div>
              <div class="row">
                <div class="col-md-12">
                  <label>Descrição</label>
                  <div class="form-group">
                    <input class="form-control" type="text" v-model="categorias.filtro.descricao">
                  </div>
                </div>
              </div>
              <div>
                <b-button
                  class="mr-2"
                  variant="primary"
                  v-on:click="categorias.cadastradas()"
                >Buscar</b-button>

                <b-button variant="warning" v-on:click="categorias.limparFiltro()">Limpar Filtro</b-button>
              </div>
            </div>
          </div>
        </div>

        <modalDadosCategoria :categorias="categorias"/>
        <modalRemoverCategoria :categorias="categorias"/>

        <table class="table" style="margin-top: 15px">
          <thead>
            <tr>
              <th>#</th>
              <th>Descrição</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody v-show="categorias.categorias.length == 0" class="text-center">
            <tr>
              <td colspan="3">
                <em>Nenhuma categoria encontrada.</em>
              </td>
            </tr>
          </tbody>
          <tbody v-show="categorias.categorias.length > 0">
            <tr v-for="categoria in categorias.categorias" :key="categoria.id">
              <td>{{categoria.idCategoria}}</td>
              <td>{{categoria.descricao}}</td>
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-primary"
                  v-on:click="categorias.selecionar(categoria); categorias.modalDadosVisivel = true"
                  v-b-tooltip
                  title="Editar"
                >
                  <fa-icon icon="pencil-alt"/>
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  style="margin-left: 5px"
                  v-on:click="categorias.selecionar(categoria); categorias.modalRemoverVisivel = true"
                  v-b-tooltip
                  title="Remover"
                >
                  <fa-icon icon="trash-alt"/>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot v-show="categorias.categorias.length > 0">
            <tr>
              <td colspan="3">
                <b-pagination
                  align="center"
                  v-model="categorias.filtro.paginacao.inicio"
                  v-on:input="categorias.cadastradas()"
                  v-bind:per-page="categorias.filtro.paginacao.limite"
                  v-bind:total-rows="categorias.filtro.paginacao.totalRegistros"
                ></b-pagination>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { storeCategorias } from "@/store/StoreCategorias.js";
import modalDadosCategoria from "@/components/categorias/ModalDadosCategoria.vue";
import modalRemoverCategoria from "@/components/categorias/ModalRemoverCategoria.vue";

export default {
  name: "CategoriasConsultar",
  components: {
    modalDadosCategoria,
    modalRemoverCategoria
  },
  data: function() {
    return {
      categorias: storeCategorias.state
    };
  }
};
</script>
