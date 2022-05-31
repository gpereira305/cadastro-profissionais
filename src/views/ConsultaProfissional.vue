<template>
  <consulta-header-title
    :headerTitle="headerTitle"
    :subHeaderTitle="subHeaderTitle"
  ></consulta-header-title>

  <consulta-main>
    <div class="revisao__text">
      <form @submit.prevent="get_todos_dados">
        <!-- NOME -->
        <div class="col mt-3">
          <label class="col-form-label">Nome Completo*</label>
          <input
            type="text"
            class="form-control consulta__border"
            placeholder="Digite o nome completo"
            aria-label="Nome completo"
            v-model="nome"
            @keypress="get_apenas_texto"
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
            @keypress="get_apenas_numeros"
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
            @keypress="get_apenas_numeros"
            v-mask="['(##) ####-####', '(##) #####-####']"
          />
        </div>

        <!-- ESTADO -->
        <div class="row mt-5 consulta__select">
          <div class="col">
            <label>Estado*</label>
            <select
              class="form-select consulta__border pointer"
              aria-label="Selecionado padrão"
              v-model="selected_estado"
              @change="fetch_cidades"
              :disabled="!todos_estados.length"
            >
              <option>{{ selected_estado }}</option>
              <option
                v-for="estado in todos_estados"
                :key="estado.id"
                :value="estado"
              >
                {{ estado.nome }}
              </option>
            </select>
          </div>

          <!-- CIDADE -->
          <div class="col">
            <label>Cidade*</label>
            <select
              class="form-select consulta__border pointer"
              aria-label="Selecionado padrão"
              v-model="selected_cidade"
              :disabled="!cidades_filtradas.length"
            >
              <option selected disabled>
                {{ selected_cidade }}
              </option>
              <option
                v-for="cidade in cidades_filtradas"
                :key="cidade.id"
                :value="cidade"
              >
                {{ cidade.nome }}
              </option>
            </select>
          </div>
        </div>

        <!-- COMPONENT BOTÃO  -->
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
        <img :src="doctorsImage" alt="Médicos" title="Médicos" />
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

import { api_cidades, api_estados_profissionais } from "../api";
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
      api_cidades,
      api_estados_profissionais,

      todos_estados: [],
      cidades_filtradas: [],

      nome: this.nome || "",
      cpf: this.cpf || "",
      telefone: this.telefone || "",
      selected_estado: this.selected_estado || "Selecione",
      selected_cidade: this.selected_cidade || "Selecione",

      dados_usuario: [],
      profissionais: [],
    };
  },
  methods: {
    get_todos_dados() {
      const cpfIsValid = this.profissionais.some(
        (item) => item.cpf === this.cpf.replace(/[\. ,:-]+/g, "")
      );
      if (
        !this.nome &&
        !this.cpf &&
        !this.telefone &&
        !this.selected_estado.nome &&
        !this.selected_cidade.nome
      ) {
        this.$toast.open({
          message: "Preencha os campos vazios!",
        });
      } else if (!this.nome) {
        this.$toast.open({
          message: "Nome é obrigatório!",
        });
        return;
      } else if (this.nome.length < 4 || this.nome.length > 48) {
        this.$toast.open({
          message: "O nome precisa ser de 3 a 48 caracteres!",
        });
        return;
      } else if (!this.cpf) {
        this.$toast.open({
          message: "CPF é obrigatório!",
        });
        return;
      } else if (this.cpf.length < 14) {
        this.$toast.open({
          message: "O CPF precisa ter 11 dígitos!",
        });
        return;
      } else if (!this.telefone) {
        this.$toast.open({
          message: "Telefone é obrigatório!",
        });
        return;
      } else if (this.telefone.length < 15) {
        this.$toast.open({
          message: "O telefone precisa ter 11 dígitos!",
        });
        return;
      } else if (!this.selected_estado.nome) {
        this.$toast.open({
          message: "Estado é obrigatório!",
        });
        return;
      } else if (!this.selected_cidade.nome) {
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
          estado: this.selected_estado,
          cidade: this.selected_cidade,
        };
        if (!dadosColetados) {
          this.dados_usuario.push(dadosColetados);
        }
        localStorage.dados_usuario = JSON.stringify(dadosColetados);
        this.$router.push("/atendimento");
      }
    },
    fetch_cidades() {
      axios
        .get(this.api_cidades)
        .then((res) => {
          this.cidades_filtradas = res.data;
          this.cidades_filtradas = this.cidades_filtradas.filter(
            (cidade) => cidade.estadoId === this.selected_estado.id
          );
        })
        .catch((err) => console.log(err.message));
    },
    get_apenas_numeros(e) {
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
    get_apenas_texto(e) {
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
        cidade: this.selected_cidade,
        estado: this.selected_estado,
      } = this.dados_usuario);
    }

    axios
      .all(this.api_estados_profissionais.map((data) => axios.get(data)))
      .then(
        axios.spread(({ data: todos_estados }, { data: profissionais }) => {
          (this.todos_estados = todos_estados),
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
.pointer {
  cursor: pointer;
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
