import { createApp } from "vue";
import App from "./App.vue";
import "virtual:svg-icons-register";
import "uno.css";
import { createPinia } from "pinia";
import "@/styles/index.scss";
import router from "@/router";
// import i18n from "@/lang/index";
createApp(App).use(router).use(createPinia()).mount("#app");
