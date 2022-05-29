<template>
  <section class="consulta-container">
    <header>
      <nav class="d-flex align-items-center">
        <span
          class="material-icon"
          @click="goback"
          v-if="this.$route.path !== '/'"
        >
          <span class="material-symbols-outlined" title="Voltar">
            arrow_back_ios_new
          </span>
        </span>
      </nav>
    </header>
    <main class="d-flex flex-column justify-content-between">
      <router-view></router-view>
    </main>
  </section>
</template>

<script>
import ConsultaHeadTitle from "./components/ConsultaHeaderTitle.vue";
import ConsultaAtendimento from "./views/ConsultaAtendimento.vue";
import ConsultaProfissional from "./views/ConsultaProfissional.vue";
import ConsultaRevisao from "./views/ConsultaRevisao.vue";

export default {
  name: "App",
  components: {
    ConsultaHeadTitle,
    ConsultaAtendimento,
    ConsultaProfissional,
    ConsultaRevisao,
  },
  methods: {
    goback() {
      this.$router.back(-1);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700&display=swap");

* {
  margin: 0;
  padding: 0;
}

:root {
  --primary0: #483698;
  --secondary0: #ffffff;
  ---secondary1: #f9f9f9;
  --secondary3: #b9b9b9;
  --secondary4: #8a8a8a;
  --secondary7: #282828;
  --cta0: #fbde40;
  --cta1: #ffe766;
  --danger: #dc3545;

  --primary-font: "Comfortaa", cursive;
  --secondary-font: "Open Sans", sans-serif;
  --transition: all ease-in 0.3s;
  --hover-effect: brightness(0.9);
}

html,
body {
  box-sizing: border-box;
  font-family: var(--primary-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--cta0);
  color: var(--secondary7);
}

nav {
  min-height: 12vh;
}

nav span {
  color: var(--primary0);
  cursor: pointer;
}

.consulta-container {
  padding: 0 20%;
}

main {
  background-color: var(--secondary0);
  min-height: 80vh;
  margin: auto;
  padding: 55px 0 55px 8%;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

/*
*==============================
*       COMMON  STYLE  
*==============================
*/
.revisao__text {
  width: 100%;
  height: 100%;
}

.revisao__text--content {
  font-family: var(--secondary-font);
  margin-bottom: 1rem;
}

.revisao__text--content p {
  margin-bottom: 0;
}

.revisao__text--content p:first-child {
  font-weight: 700;
}

.revisao__text--content p:last-child {
  color: rgb(0 0 0 / 70%);
  font-weight: 500;
}

.revisao__image {
  width: 100%;
}

.consulta__border {
  border: 1.5px solid var(--primary0);
}

.consulta__border::placeholder,
.form-select {
  color: var(--secondary3);
  font-size: 1rem;
}

.consulta__border:focus {
  border: 2px solid var(--primary0);
}

@media (max-width: 1540px) {
  .revisao__image img {
    width: 100%;
  }
}

@media (max-width: 990px) {
  .revisao__image {
    display: none;
  }
}

@media (max-width: 1540px) {
  .consulta-container {
    padding: 0 15%;
  }
}

@media (max-width: 1140px) {
  .consulta-container {
    padding: 0 10%;
  }

  main {
    padding: 55px 8%;
  }
}

@media (max-width: 990px) {
  .consulta-container {
    padding: 0 15%;
  }
}

@media (max-width: 790px) {
  .consulta-container {
    padding: 0 10%;
  }
}

@media (max-width: 590px) {
  .consulta-container {
    padding: 0 5%;
  }
}
</style>
