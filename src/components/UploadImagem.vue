<template>
  <div>
    <div>
      <input
        style="display: none"
        type="file"
        @change="previewImage"
        accept="image/*"
        ref="inputImagem"
      >
    </div>

    <!-- <div class="input-group mb-2">
      <div class="input-group-prepend">
        <button class="btn btn-primary" @click="$refs.inputImagem.click()">
          <fa-icon icon="folder-open"/>Procurar Imagem
        </button>
      </div>
      <div class="form-control">{{imageData.name}}</div>
    </div>-->
    <a href="#" class="image-preview" @click="$refs.inputImagem.click()">
      <img
        v-if="base64.length > 0"
        class="preview"
        :src="base64"
        v-b-tooltip
        title="Clique para adicionar imagem"
      >
      <img
        v-else
        class="preview"
        src="../assets/image-placeholder.jpg"
        v-b-tooltip
        title="Clique para adicionar imagem"
      >
    </a>
  </div>
</template>
<script>
export default {
  name: "ImagemUpload",
  props: ["imageData"],
  data() {
    return {
      base64: "" // imagem base64
    };
  },
  watch: {
    imageData: function (val) {
        this.base64 = val != undefined ? val : "";
    }    
  },
  methods: {
    previewImage: function(event) {
      // referencia ao elemento input da DOM
      var input = event.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = e => {
          this.base64 = e.target.result;

          this.$emit("uploaded", { arquivo: input.files[0], foto: this.base64 });
        };

        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>
<style>
.image-display {
  height: 170px;
  width: 100px;  
}
.image-preview {
  padding: 20px;
}
img.preview {
  width: 150px;
  height: 150px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}
img.thumbnail {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 0px ;

}
</style>