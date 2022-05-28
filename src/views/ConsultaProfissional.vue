<template>
  <consulta-header-title
    :headerTitle="headerTitle"
    :subHeaderTitle="subHeaderTitle"
  ></consulta-header-title>

  <consulta-main>
    <div class="revisao__text">
      <form>
        <div class="col mt-3">
          <label class="col-form-label">Nome Completo*</label>
          <input
            type="text"
            class="form-control consulta__border"
            placeholder="Digite o nome completo"
            aria-label="Nome completo"
            v-model="name"
          />
        </div>
        <div class="col mt-3">
          <label class="col-form-label">CPF*</label>
          <input
            type="text"
            class="form-control consulta__border consulta__input"
            placeholder="Digite um CPF"
            aria-label="Número de CPF"
            v-model="cpf"
          />
        </div>

        <div class="col mt-3">
          <label class="col-form-label">Número de celular*</label>
          <input
            type="text"
            class="form-control consulta__border consulta__input"
            placeholder="(00)0 0000-0000"
            aria-label="Número de celular"
            v-model="phone"
          />
        </div>

        <div class="row mt-5 consulta__select">
          <div class="col">
            <label>Estado*</label>
            <select
              class="form-select consulta__border"
              aria-label="Selecionado padrão"
              v-model="selectedEstado"
              @change="fetchCidades"
              :disabled="!todosEstados.length"
            >
              <option selected disabled>Selecione</option>
              <option
                v-for="estado in todosEstados"
                :key="estado.id"
                :value="estado"
              >
                {{ estado.nome }}
              </option>
            </select>
          </div>

          <div class="col">
            <label>Cidade*</label>
            <select
              class="form-select consulta__border"
              aria-label="Selecionado padrão"
              v-model="selectedCidade"
              :disabled="!cidadesFiltradas.length"
            >
              <option selected disabled>Selecione</option>
              <option
                v-for="cidade in cidadesFiltradas"
                :key="cidade.id"
                :value="cidade"
              >
                {{ cidade.nome }}
              </option>
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
          @click="atendimento()"
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

import axios from "axios";
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
      apiEstados: "https://api-teste-front-end-fc.herokuapp.com/estados",
      apiCidades: "https://api-teste-front-end-fc.herokuapp.com/cidades",

      todosEstados: [],
      cidadesFiltradas: [],
      name: "",
      cpf: "",
      phone: "",
      selectedEstado: "Selecione",
      selectedCidade: "Selecione",

      checked: [],
    };
  },

  methods: {
    atendimento() {
      this.$router.push("/atendimento");
      const dadosColetados = {
        nome: this.name,
        cpf: this.cpf,
        telefone: this.phone,
        estado: this.selectedEstado.nome,
        cidade: this.selectedCidade.nome,
      };
      this.checked.push(dadosColetados);
      console.log(this.checked, "dados-inputados");

      localStorage.checked = JSON.stringify(dadosColetados);
    },
    fetchCidades() {
      axios
        .get(this.apiCidades)
        .then((res) => {
          this.cidadesFiltradas = res.data;
          this.cidadesFiltradas = this.cidadesFiltradas.filter(
            (cidade) => cidade.estadoId === this.selectedEstado.id
          );
        })
        .catch((err) => console.log(err.message));
    },
  },

  mounted() {
    axios
      .get(this.apiEstados)
      .then((res) => {
        this.todosEstados = res.data;
      })
      .catch((err) => console.log(err.message));
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
