<template>
  <consulta-header-title
    :headerTitle="headerTitle"
    :subHeaderTitle="subHeaderTitle"
  ></consulta-header-title>

  <consulta-main>
    <div class="revisao__text">
      <form>
        <div class="col">
          <label for="inputRole">Especialidade principal*</label>
          <select
            class="form-select consulta__border"
            aria-label="Default select example"
            id="inputRole"
          >
            <option selected class="selected">Selecione</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <div class="col mt-4">
          <label for="inputRole">Especialidade principal*</label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">R$</span>
            <input
              type="text"
              class="form-control consulta__input"
              placeholder="Valor"
              aria-label="valor"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div
          style="
            border-radius: 5px;
            padding: 10px 35px;
            box-shadow: rgb(0 0 0 / 18%) 0px 2px 2px;
            margin-bottom: 1rem;
          "
        >
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault1">Pix</label>
          </div>
        </div>

        <div
          style="
            border-radius: 5px;
            padding: 10px 35px;
            box-shadow: rgb(0 0 0 / 18%) 0px 2px 2px;
            margin-bottom: 1rem;
          "
        >
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Em dinheiro
            </label>
          </div>
        </div>

        <div
          style="
            border-radius: 5px;
            padding: 10px 35px;
            box-shadow: rgb(0 0 0 / 18%) 0px 2px 2px;
          "
        >
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault3"
            />
            <label class="form-check-label" for="flexRadioDefault3">
              Cartão de crédito
            </label>
          </div>
        </div>
      </form>

      <consulta-progress-bar
        :barLength="barLength"
        :barBorder="barBorder"
        :barSteps="barSteps"
      ></consulta-progress-bar>

      <div
        class="revisao__text--button d-flex flex-column align-items-center mt-5"
      >
        <consulta-button
          :btnTitle="btnTitle"
          :colorProp="colorProp"
          :backgroundProp="backgroundProp"
          @click="revisao"
        >
          <router-link :to="{ name: 'ConsultaRevisao' }"></router-link>
        </consulta-button>
      </div>
    </div>

    <div class="revisao__image">
      <div>
        <img :src="patientImage" alt="Paciente" />
      </div>
    </div>
  </consulta-main>
</template>
<script>
import ConsultaHeaderTitle from "@/components/ConsultaHeaderTitle.vue";
import ConsultaMain from "@/components/ConsultaMain.vue";
import ConsultaButton from "@/components/ConsultaButton.vue";
import ConsultaRevisao from "./ConsultaRevisao.vue";
import ConsultaProgressBar from "@/components/ConsultaProgressBar.vue";

export default {
  name: "ConsultaAtendimento",
  components: {
    ConsultaHeaderTitle,
    ConsultaMain,
    ConsultaButton,
    ConsultaRevisao,
    ConsultaProgressBar,
  },
  data() {
    return {
      headerTitle: "Sobre o atendimento",
      subHeaderTitle: "Detalhes do atendimento",
      btnTitle: "Próximo",
      backgroundProp: "var(--primary0)",
      colorProp: "var(--secondary0)",
      barLength: "100%",
      barBorder: "3px",
      barSteps: 2,
      patientImage: require("@/assets/images/patient.png"),
    };
  },
  methods: {
    revisao() {
      this.$router.push("/revisão-cadastro");
    },
  },
};
</script>
<style lang="css" scoped>
.consulta__input {
  max-width: 285px;
}
</style>
