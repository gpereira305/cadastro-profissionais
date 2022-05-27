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
              v-model="state"
            
            >
               <option v-for="state in allStates" :key="state.id" :value="state"   @change="getCity(state.id)">
                 {{state.nome}}
               </option>
            </select>
            <span>{{state.id}}</span>
          </div>

          <div class="col">
            <label>Cidade*</label>
            <select
              class="form-select consulta__border"
              aria-label="Selecionado padrão"
              v-model="city"
            >
              <option v-for="city in allCities" :key="city.id" :value="city">
                 {{city.nome}}
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
      
      allStates: [],
      allCities: [],

      name: "",
      cpf: "",
      phone: "",
      state: "Selecione",
      city: "Selecione", 
    };
  },
  methods: {
    atendimento() {
      this.$router.push("/atendimento");
      const userData = [
        this.name ,
        this.cpf,
        this.phone,
        this.state,
        this.city,  
      ]
      console.log(userData, '===>');
    }, 
    getCity() { 
    const apiCities = `https://api-teste-front-end-fc.herokuapp.com/cidades?estadoId=${this.state.id}`; 
    console.log(this.state.id, 'ID')
     fetch(apiCities)
     .then(res => res.json())
     .then(data => console.log(this.allCities = data))
     .catch(err => console.log(err.message)) 
    
    }
  },
  mounted(){
    const apiStates =  `https://api-teste-front-end-fc.herokuapp.com/estados`; 

     
     fetch(apiStates)
     .then(res => res.json())
     .then(data => console.log(this.allStates = data))
     .catch(err => console.log(err.message)) 


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
