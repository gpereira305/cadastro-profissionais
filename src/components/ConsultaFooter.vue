<template>
  <div
    class="d-flex justify-content-center align-items-end"
    style="height: 6vh"
  >
    <small>&copy; {{ getUpdatedYear }} | Cadastro de Profissionais</small>
  </div>
</template>

<script>
export default {
  name: "ConsultaFooter",
  computed: {
    getUpdatedYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped></style>
