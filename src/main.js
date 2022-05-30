import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const options = {
  icon: "success",
  showConfirmButton: true,
  confirmButtonColor: "#3085d6",
  timer: 4000,
};

const open = {
  type: "error",
  duration: 2000,
  position: "top-right",
  dismissible: true,
};

createApp(App)
  .use(router)
  .use(VueSweetalert2, options)
  .use(VueToast, open)
  .mount("#app");
