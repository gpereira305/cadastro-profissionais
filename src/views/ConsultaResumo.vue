<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 68vh"
  >
    <h1>CADASTRO FEITO COM SUCESSO!</h1>
    <button type="button" @click="goingHome">Home</button>
  </div>
</template>

<script>
export default {
  name: "ConsultaResumo",
  data() {
    return {};
  },

  methods: {
    mensagem_sucesso() {
      setTimeout(() => {
        this.$swal(
          "Cadastro feito com sucesso!",
          "Obrigado por cadastrar-se conosco!"
        );
      }, 1000);
    },
    goingHome() {
      this.$router.push("/");
      window.localStorage.clear();
    },
  },
  mounted() {
    this.mensagem_sucesso();
  },
};
</script>

<style lang="css" scoped></style>
