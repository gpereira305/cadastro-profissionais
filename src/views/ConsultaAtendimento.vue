<template>
  <consulta-header-title
    :headerTitle="headerTitle"
    :subHeaderTitle="subHeaderTitle"
  ></consulta-header-title>

  <consulta-main>
    <div class="left"><h3>Text</h3></div>
    <div class="right"><h3>Image</h3></div>
  </consulta-main>
</template>
<script>
import ConsultaHeaderTitle from "../components/ConsultaHeaderTitle.vue";
import ConsultaMain from "../components/ConsultaMain.vue";

export default {
  name: "ConsultaAtendimento",
  components: {
    ConsultaHeaderTitle,
    ConsultaMain,
  },
  data() {
    return {
      headerTitle: "Sobre o atendimento",
      subHeaderTitle: "Detalhes do atendimento",
    };
  },
};
</script>
<style lang="css" scoped>
.left {
  background-color: tomato;
  width: 100%;
}
.right {
  background-color: rgb(0, 153, 255);
  width: 100%;
}

@media (max-width: 990px) {
  .right {
    display: none;
  }
}
</style>
