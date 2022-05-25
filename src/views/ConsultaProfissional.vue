<template>
  <consulta-header-title
    :headerTitle="headerTitle"
    :subHeaderTitle="subHeaderTitle"
  ></consulta-header-title>
  <div class="consulta"></div>
</template>
<script>
import ConsultaHeaderTitle from "../components/ConsultaHeaderTitle.vue";
export default {
  name: "ConsultaProfissional",
  components: {
    ConsultaHeaderTitle,
  },
  data() {
    return {
      headerTitle: "Sobre o profissional",
      subHeaderTitle: "Dados do profissional",
    };
  },
};
</script>
<style lang="css" scoped></style>
