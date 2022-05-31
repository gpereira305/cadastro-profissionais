import { createRouter, createWebHistory } from "vue-router";
import ConsultaProfissional from "../views/ConsultaProfissional.vue";
import ConsultaAtendimento from "../views/ConsultaAtendimento.vue";
import ConsultaRevisao from "../views/ConsultaRevisao.vue";
import ConsultaResumo from "../views/ConsultaResumo.vue";

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
    path: "/revisão",
    name: "ConsultaRevisao",
    component: ConsultaRevisao,
  },
  {
    path: "/resumo",
    name: "ConsultaResumo",
    component: ConsultaResumo,
  },
  {
    path: "/:catchAll(.*)",
    name: "ConsultaProfissional",
    component: ConsultaProfissional,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
