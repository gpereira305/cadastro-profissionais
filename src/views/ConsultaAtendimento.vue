<template>
  <consulta-header-title
    :headerTitle="headerTitle"
    :subHeaderTitle="subHeaderTitle"
  ></consulta-header-title>

  <consulta-main>
    <div class="revisao__text">
      <form>
        <!-- ESPECIALIDADE -->
        <div class="col">
          <label>Especialidade principal*</label>
          <select
            class="form-select consulta__border"
            aria-label="Selecionado padrão"
            v-model="selectedEspecialidade"
          >
            <option selected disabled>Selecione</option>
            <option
              v-for="especialidade in especialidades"
              :key="especialidade.id"
              :value="especialidade"
            >
              {{ especialidade.nome }}
            </option>
          </select>
        </div>

        <!-- PREÇO -->
        <div class="col mt-4">
          <label for="inputRole">Informe o preço da consulta*</label>
          <div class="input-group mb-3">
            <span class="input-group-text consulta__price--bg" id="basic-addon1"
              >R$</span
            >
            <input
              type="text"
              class="form-control consulta__input consulta__border"
              placeholder="Valor"
              aria-label="valor"
              aria-describedby="basic-addon1"
              v-model="valor"
            />
          </div>
        </div>

        <!-- PAGAMENTNO -->
        <div class="col mt-4">
          <label for="inputRole">Formas de pagamento da consulta*</label>
          <div class="consulta__radios form-check mt-3">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              v-model="pagamento"
              value="Pix"
              @click="removeChecked()"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Pix
            </label>
          </div>

          <div class="consulta__radios form-check mt-2">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              v-model="pagamento"
              value="Dinheiro"
              @click="removeChecked()"
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Em dinheiro
            </label>
          </div>

          <div class="consulta__radios form-check mt-2">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault3"
              @click="toggleChecked()"
              v-model="pagamento"
              value="Cartão de crédito"
            />
            <label class="form-check-label" for="flexRadioDefault3">
              Cartão de crédito
            </label>
            <div
              class="consulta__radios--toggle mt-4"
              :class="{ activeRadios: isActive }"
            >
              <label class="form-check-label ms-2"> Parcelamento em </label>
              <div
                class="form-check m-2"
                v-for="item in paymentPeriod"
                :key="item.id"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  :value="item.id"
                  v-model="parcelamento"
                  name="flexRadioDefault"
                />
                <label class="form-check-label">
                  {{ item.text }}
                </label>
              </div>
            </div>
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
          @click="getRevisao"
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
import axios from "axios";

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
      apiEspacialidades:
        "https://api-teste-front-end-fc.herokuapp.com/especialidades",
      isActive: false,
      selectedEspecialidade: "Selecione",

      valor: null,
      pagamento: [],
      especialidades: [],
      parcelamento: null,
      atendimento: [],

      paymentPeriod: [
        { text: "1x sem juros", id: 1 },
        { text: "2x sem juros", id: 2 },
        { text: "3x sem juros", id: 3 },
      ],
    };
  },
  methods: {
    getRevisao() {
      this.$router.push("/revisão-cadastro");
      const dadosAtendimento = {
        especialidade: this.selectedEspecialidade.nome,
        valor: this.valor,
        pagamento: this.pagamento,
        parcelamento: this.parcelamento,
      };
      console.log(dadosAtendimento);
      localStorage.atendimento = JSON.stringify(dadosAtendimento);
    },

    toggleChecked() {
      this.isActive = !this.isActive;
    },

    removeChecked() {
      this.isActive = false;
      this.payTimes = null;
    },
  },
  mounted() {
    axios
      .get(this.apiEspacialidades)
      .then((res) => {
        this.especialidades = res.data;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>
<style lang="css" scoped>
.consulta__input {
  max-width: 285px;
}

.consulta__radios {
  border-radius: 8px;
  padding: 10px 35px;
  margin-bottom: 1rem;
  box-shadow: 0px 2px 3px 0px rgb(0 0 0 / 25%);
}

.consulta__radios input {
  cursor: pointer;
}

.consulta__radios--toggle {
  display: none;
}

.consulta__price--bg {
  background-color: var(--primary0);
  color: var(--secondary0);
  border: 1px solid var(--primary0);
}

.activeRadios {
  display: flex;
  flex-direction: column;
}
</style>
