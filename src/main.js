import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const options = {
  icon: "error",
  showConfirmButton: true,
  confirmButtonColor: "#3085d6",
  timer: 2000,
};

createApp(App).use(router).use(VueSweetalert2, options).mount("#app");
