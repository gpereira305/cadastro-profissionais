<template>
  <consulta-header-title
    :headerTitle="headerTitle"
    :subHeaderTitle="subHeaderTitle"
  ></consulta-header-title>

  <consulta-main>
    <div class="revisao__text">
      <form>
        <div class="col mt-3">
          <label for="inputName" class="col-form-label">Nome Completo*</label>
          <input
            id="inputName"
            type="text"
            class="form-control consulta__border"
            placeholder="Digite o nome completo"
            aria-label="Nome completo"
          />
        </div>
        <div class="col mt-3">
          <label for="inputCpf" class="col-form-label">CPF*</label>
          <input
            id="inputCpf"
            type="text"
            class="form-control consulta__border consulta__input"
            placeholder="Digite um CPF"
            aria-label="Número de CPF"
          />
        </div>
        <div class="col mt-3">
          <label for="inputPhone" class="col-form-label"
            >Número de celular*</label
          >
          <input
            id="inputPhone"
            type="text"
            class="form-control consulta__border consulta__input"
            placeholder="(00)0 0000-0000"
            aria-label="Número de celular"
          />
        </div>

        <div class="row mt-5 consulta__select">
          <div class="col">
            <label for="inputState">Estado*</label>
            <select
              class="form-select consulta__border"
              aria-label="Default select example"
              id="inputState"
            >
              <option selected class="selected">Selecione</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div class="col">
            <label for="inputCity">Cidade*</label>
            <select
              class="form-select consulta__border"
              aria-label="Default select example"
              id="inputCity"
            >
              <option selected>Selecione</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </form>

      <consulta-progress-bar
        :barLength="barLength"
        :barBorder="barBorder"
        :barSteps="barSteps"
      ></consulta-progress-bar>

      <div class="revisao__text--button d-flex flex-column align-items-center">
        <consulta-button
          :btnTitle="btnTitle"
          :colorProp="colorProp"
          :backgroundProp="backgroundProp"
          @click="atendimento"
        >
        </consulta-button>
      </div>
    </div>

    <div class="revisao__image">
      <div>
        <img :src="doctorsImage" alt="Médicos" />
      </div>
    </div>
  </consulta-main>
</template>
<script>
import ConsultaHeaderTitle from "@/components/ConsultaHeaderTitle.vue";
import ConsultaMain from "@/components/ConsultaMain.vue";
import ConsultaButton from "@/components/ConsultaButton.vue";
import ConsultaAtendimento from "./ConsultaAtendimento.vue";
import ConsultaProgressBar from "@/components/ConsultaProgressBar.vue";
export default {
  name: "ConsultaProfissional",
  components: {
    ConsultaHeaderTitle,
    ConsultaMain,
    ConsultaButton,
    ConsultaAtendimento,
    ConsultaProgressBar,
  },
  data() {
    return {
      headerTitle: "Sobre o profissional",
      subHeaderTitle: "Dados do profissional",
      btnTitle: "Próximo",
      backgroundProp: "var(--primary0)",
      colorProp: "var(--secondary0)",
      barLength: "50%",
      barBorder: "3px 0 0 3px",
      barSteps: 1,
      doctorsImage: require("@/assets/images/doctors.png"),
    };
  },
  methods: {
    atendimento() {
      this.$router.push("/atendimento");
    },
  },
};
</script>
<style lang="css" scoped>
form {
  font-family: var(--secondary-font);
}

form .col-form-label {
  font-weight: 600;
}

.form-select option {
  color: initial;
}

.consulta__input {
  max-width: 285px;
}

@media (max-width: 620px) {
  .consulta__input {
    max-width: initial;
  }

  .consulta__select {
    margin-top: 2rem !important;
    flex-direction: column;
  }

  .consulta__select .col:first-child {
    margin-bottom: 1.5rem;
  }
}
</style>
