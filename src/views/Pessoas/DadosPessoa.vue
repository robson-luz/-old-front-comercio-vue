 <template>
  <div id="app" class="container" style="margin-top: 30px;">
    <div class="card w-75 mx-auto">
      <div class="card-header">
        <h5>Dados Pessoais</h5>
      </div>
      <div class="card">
        <div class="card-body">
          <div>
            <div class="row">
              <div class="col-md-6">
                <div>
                  <img
                    v-if="pessoas.dadosPessoa.arquivo != null"
                    class="preview"
                    :src="pessoas.dadosPessoa.arquivo"
                  >
                  <img v-else class="preview" src="@/assets/user-placeholder.png">
                </div>
              </div>
            </div>
            <br />

            <div class="row">
              <div class="col-md-6">
                <b>Nome</b>
                <div class="form-group">
                  <div>{{pessoas.dadosPessoa.nome}}</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <b>Cpf</b>
                <div class="form-group">
                  <div>{{pessoas.dadosPessoa.cpf}}</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <b>E-mail</b>
                <div class="form-group">
                  <div>{{pessoas.dadosPessoa.email}}</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <b>Número Celular</b>
                <div class="form-group">
                  <div v-if="pessoas.dadosPessoa.numeroCelular">{{pessoas.dadosPessoa.numeroCelular}}</div>
                  <div v-else>{{pessoas.dadosPessoa.numeroCelular}}Não informado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storePessoas } from "@/store/StorePessoas.js";

export default {
  name: "DadosPessoa",
  data: function() {
    return {
      pessoas: storePessoas.state
    };
  },
  beforeMount() {
    this.pessoas.detalhes();
  }
};
</script>
