<template>
  <consulta-header-title :headerTitle="headerTitle"></consulta-header-title>
  <consulta-main>
    <div class="revisao__text">
      <div v-for="data in userData" :key="data.id">
        <div class="revisao__text--content">
          <p>Nome completo</p>
          <p>{{ data.nome }}</p>
        </div>
        <div class="revisao__text--content">
          <p>CPF</p>
          <p>{{ data.cpf }}</p>
        </div>
        <div class="revisao__text--content">
          <p>Número de celular ou telefone</p>
          <p>{{ data.telefone }}</p>
        </div>
        <div class="revisao__text--content">
          <p>Estado/Cidade</p>
          <p>{{ data.cidade }}/ {{ data.estado }}</p>
        </div>
      </div>

      <div class="revisao__text--content">
        <p>Especialidade principal</p>
        <p>{{ role }}</p>
      </div>
      <div class="revisao__text--content">
        <p>Preço da consulta</p>
        <p>R$ {{ totalPrice }}</p>
      </div>
      <div class="revisao__text--content">
        <p>Formas de pagamento da consulta</p>
        <p>{{ paymentMethod }}</p>
      </div>

      <div
        class="revisao__text--button d-flex flex-column align-items-center mt-5"
      >
        <consulta-button
          :btnTitle="btnTitle"
          :colorProp="colorProp"
          :backgroundProp="backgroundProp"
          @click="atendimento"
        >
        </consulta-button>
        <span class="mt-4" @click="redirect">Editar cadastro</span>
      </div>
    </div>

    <div class="revisao__image">
      <div>
        <img :src="nurseImage" alt="Médicos" />
      </div>
    </div>
  </consulta-main>
</template>
<script>
import ConsultaHeaderTitle from "@/components/ConsultaHeaderTitle.vue";
import ConsultaButton from "@/components/ConsultaButton.vue";
import ConsultaMain from "@/components/ConsultaMain.vue";
export default {
  name: "ConsultaRevisao",
  components: {
    ConsultaHeaderTitle,
    ConsultaButton,
    ConsultaMain,
  },
  data() {
    return {
      headerTitle: "Revisão de cadastro",
      btnTitle: "Cadastrar Profissional",
      backgroundProp: "var(--cta0)",
      colorProp: "var(--secondary7)",

      name: "Fabrício Rodrigues de Oliveira",
      cpf: "485.628.337-89",
      phone: "(53)88620847",
      cityAndState: "Rio Grande do Sul - Pelotas",
      role: "Cardiologia",
      totalPrice: "200,00",
      paymentMethod: "Cartão de crédito - Parcelamento em 2x sem juros",

      nurseImage: require("../assets/images/nurse.png"),

      userData: [],
      checked: this.checked,
    };
  },
  methods: {
    redirect() {
      this.$router.push("/");
    },
    atendimento() {
      this.$router.push("/revisão-teste");
    },
  },
  mounted() {
    // recebe dados do localstorage

    if (localStorage.checked) {
      this.checked = JSON.parse(window.localStorage.checked);
      this.userData.push(this.checked);
      console.log(this.checked, "==>from local");
    }
  },
  watch: {
    dadosSalvos(novosDados) {
      localStorage.dadosSalvos = novosDados;
    },
  },
};
</script>
<style lang="css" scoped>
.revisao__text--button span {
  color: var(--primary0);
  font-weight: 700;
  cursor: pointer;
}
</style>
