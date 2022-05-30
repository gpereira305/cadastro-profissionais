<template>
  <consulta-header-title
    :headerTitle="headerTitle"
    :subHeaderTitle="subHeaderTitle"
  ></consulta-header-title>

  <consulta-main>
    <div class="revisao__text">
      <form @submit.prevent="getTodosOsDados">
        <!-- NOME -->
        <div class="col mt-3">
          <label class="col-form-label">Nome Completo*</label>
          <input
            type="text"
            class="form-control consulta__border"
            placeholder="Digite o nome completo"
            aria-label="Nome completo"
            v-model="nome"
            @keypress="getApenasTexto"
          />
        </div>

        <!-- CPF -->
        <div class="col mt-3">
          <label class="col-form-label">CPF*</label>
          <input
            type="text"
            class="form-control consulta__border consulta__input"
            placeholder="Digite um CPF"
            aria-label="Número de CPF"
            v-model.trim="cpf"
            @keypress="getApenasNums"
            v-mask="['###.###.###-##']"
          />
        </div>

        <!-- TELEFONE -->
        <div class="col mt-3">
          <label class="col-form-label">Número de celular*</label>
          <input
            type="text"
            class="form-control consulta__border consulta__input"
            placeholder="(00) 00000-0000"
            aria-label="Número de celular"
            v-model="telefone"
            @keypress="getApenasNums"
            v-mask="['(##) ####-####', '(##) #####-####']"
          />
        </div>

        <!-- CIDADE/ESTADO -->
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
              <option>{{ selectedEstado }}</option>
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
              <option selected disabled>
                {{ selectedCidade }}
              </option>
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

        <consulta-progress-bar
          :barLength="barLength"
          :barBorder="barBorder"
          :barSteps="barSteps"
        ></consulta-progress-bar>

        <div
          class="revisao__text--button d-flex flex-column align-items-center"
        >
          <consulta-button
            :btnTitle="btnTitle"
            :colorProp="colorProp"
            :backgroundProp="backgroundProp"
          >
          </consulta-button>
        </div>
      </form>
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
import { mask } from "vue-the-mask";

export default {
  name: "ConsultaProfissional",
  directives: { mask },

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
      apiCidades: "https://api-teste-front-end-fc.herokuapp.com/cidades",
      apiDados: [
        "https://api-teste-front-end-fc.herokuapp.com/estados",
        "https://api-teste-front-end-fc.herokuapp.com/profissionais",
      ],
      todosEstados: [],
      cidadesFiltradas: [],

      nome: this.nome || "",
      cpf: this.cpf || "",
      telefone: this.telefone || "",
      selectedEstado: this.selectedEstado || "Selecione",
      selectedCidade: this.selectedCidade || "Selecione",

      dados_usuario: [],
      profissionais: [],
    };
  },

  methods: {
    getTodosOsDados() {
      const cpfIsValid = this.profissionais.some(
        (item) => item.cpf === this.cpf.replace(/[\. ,:-]+/g, "")
      );

      if (!this.nome) {
        this.$toast.open({
          message: "Nome é obrigatório!",
        });
        return;
      } else if (this.nome.length < 6) {
        this.$toast.open({
          message: "O nome precisa ser maior do que 6 caracteres!",
        });
        return;
      } else if (!this.cpf) {
        this.$toast.open({
          message: "CPF é obrigatório!",
        });
        return;
      } else if (this.cpf.length < 14) {
        this.$toast.open({
          message: "O CPF precisa ter 11 caracteres!",
        });
        return;
      } else if (!this.telefone) {
        this.$toast.open({
          message: "Telefone é obrigatório!",
        });
        return;
      } else if (this.telefone.length < 15) {
        this.$toast.open({
          message: "O telefone precisa ter 11 caracteres!",
        });
        return;
      } else if (!this.selectedEstado.nome) {
        this.$toast.open({
          message: "Estado é obrigatório!",
        });
        return;
      } else if (!this.selectedCidade.nome) {
        this.$toast.open({
          message: "Cidade é obrigatório!",
        });
        return;
      } else if (cpfIsValid) {
        this.$toast.open({
          message: "CPF já cadastrado!",
        });
        return;
      } else {
        const dadosColetados = {
          nome: this.nome,
          cpf: this.cpf,
          telefone: this.telefone,
          estado: this.selectedEstado,
          cidade: this.selectedCidade,
        };

        if (!dadosColetados) {
          this.dados_usuario.push(dadosColetados);
        }
        localStorage.dados_usuario = JSON.stringify(dadosColetados);
        this.$router.push("/atendimento");
      }
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
    getApenasNums(e) {
      e = e ? e : window.event;
      const charCode = e.which ? e.which : e.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        e.preventDefault();
      } else {
        return true;
      }
    },
    getApenasTexto(e) {
      const char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-z ]+$/.test(char)) return true;
      else e.preventDefault();
    },
  },
  mounted() {
    if (localStorage.dados_usuario) {
      this.dados_usuario = JSON.parse(window.localStorage.dados_usuario);
      ({
        nome: this.nome,
        cpf: this.cpf,
        telefone: this.telefone,
        cidade: this.selectedCidade,
        estado: this.selectedEstado,
      } = this.dados_usuario);

      console.log(this.selectedEstado);
    }

    axios
      .all(this.apiDados.map((data) => axios.get(data)))
      .then(
        axios.spread(({ data: todosEstados }, { data: profissionais }) => {
          (this.todosEstados = todosEstados),
            (this.profissionais = profissionais);
          this.profissionais[profissionais];
        })
      )
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
