<template>
  <consulta-header-title :headerTitle="headerTitle"></consulta-header-title>
  <!-- <div class="d-flex justify-content-between align-items-center mt-3">
    <div class="revisao__text">
      <div class="revisao__text--content">
        <p>Nome completo</p>
        <p>{{ name }}</p>
      </div>
      <div class="revisao__text--content">
        <p>CPF</p>
        <p>{{ cpf }}</p>
      </div>
      <div class="revisao__text--content">
        <p>Número de celular ou telefone</p>
        <p>{{ phone }}</p>
      </div>
      <div class="revisao__text--content">
        <p>Estado/Cidade</p>
        <p>{{ cityAndState }}</p>
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
        ></consulta-button>
        <router-link class="mt-4" to="/">Editar Cadastro</router-link>
      </div>
    </div>

    <div class="revisao__image">
      <div>
        <img :src="nurseImage" alt="Médicos" />
      </div>
    </div>
  </div> -->
</template>
<script>
import ConsultaHeaderTitle from "../components/ConsultaHeaderTitle.vue";
import ConsultaButton from "../components/ConsultaButton.vue";
import ConsultaMain from "../components/ConsultaMain.vue";
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
      colorProp: "var(--cta0)",

      name: "Fabrício Rodrigues de Oliveira",
      cpf: "485.628.337-89",
      phone: "(53)88620847",
      cityAndState: "Rio Grande do Sul - Pelotas",
      role: "Cardiologia",
      totalPrice: "200,00",
      paymentMethod: "Catão de crédito - Parcelamento em 2x sem juros",

      nurseImage: require("../assets/images/nurse.png"),
    };
  },
};
</script>
<style lang="css" scoped>
.revisao__text {
  width: 100%;
  height: 100%;
}

.revisao__text--content {
  font-family: var(--secondary-font);
  margin-bottom: 1rem;
}

.revisao__text--content p {
  margin-bottom: 0.3rem;
}

.revisao__text--content :first-child {
  font-weight: 600;
}

.revisao__image {
  width: 100%;
}

.revisao__text--button a {
  color: var(--primary0);
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 1540px) {
  .revisao__image img {
    width: 100%;
  }
}

/* @media (max-width: 1140px) { 
} */

@media (max-width: 990px) {
  .revisao__image {
    display: none;
  }
}
</style>
