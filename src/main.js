import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import './css/style.scss'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'


createApp(App).use(store).use(router).mount("#app");
