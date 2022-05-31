<template>
  <div
    class="resumo d-flex flex-column align-items-center justify-content-between"
  >
    <div class="resumo__title d-flex flex-column align-items-center mb-3">
      <h2>Obrigado por se cadastrar conosco!</h2>
    </div>

    <div class="resumo__image d-flex justify-content-center">
      <img :src="doctors" alt="Médicos" title="Médicos" />
    </div>

    <div class="resumo__button">
      <consulta-button
        :btnTitle="btnTitle"
        :colorProp="colorProp"
        :backgroundProp="backgroundProp"
        @click="goingHome"
      >
      </consulta-button>
    </div>
  </div>
</template>

<script>
import ConsultaButton from "@/components/ConsultaButton.vue";
export default {
  name: "ConsultaResumo",
  components: {
    ConsultaButton,
  },
  data() {
    return {
      btnTitle: "Fazer novo cadastro",
      backgroundProp: "var(--cta0)",
      colorProp: "var(--secondary7)",
      doctors: require("@/assets/images/doctors.png"),
    };
  },

  methods: {
    mensagem_sucesso() {
      setTimeout(() => {
        this.$swal("Cadastro feito com sucesso!");
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

<style lang="css" scoped>
.resumo {
  padding-right: 55px;
  height: 66vh;
}

.resumo__title h2 {
  color: var(--primary0);
}

.resumo__button {
  width: 320px;
}

@media (max-width: 1140px) {
  .resumo {
    padding-right: 0;
  }
}

@media (max-width: 990px) {
  .resumo__title {
    text-align: center;
  }

  .resumo__image img {
    width: 100%;
  }
}

@media (max-width: 490px) {
  .resumo__image img {
    width: 90%;
  }

  .resumo__button {
    width: 255px;
  }
}
</style>
