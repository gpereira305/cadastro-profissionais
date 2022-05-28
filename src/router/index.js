import { createRouter, createWebHistory } from "vue-router";
import ConsultaProfissional from "../views/ConsultaProfissional.vue";
import ConsultaAtendimento from "../views/ConsultaAtendimento.vue";
import ConsultaRevisao from "../views/ConsultaRevisao.vue";
import ConsultaTeste from '../views/ConsultaTeste.vue'

import ConsultaNotFound from "../views/ConsultaNotFound.vue";

const routes = [
  {
    path: "/",
    name: "ConsultaProfissional",
    component: ConsultaProfissional,
  },
  {
    path: "/atendimento",
    name: "ConsultaAtendimento",
    component: ConsultaAtendimento,
  },
  {
    path: "/revisão-cadastro",
    name: "ConsultaRevisao",
    component: ConsultaRevisao,
  },
  {
    path: "/revisão-teste",
    name: "ConsultaTeste",
    component: ConsultaTeste,
  },
  {
    path: "/:catchAll(.*)",
    name: "ConsultaNotFound",
    component: ConsultaNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
