import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";


import './css/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { createStore } from 'vuex';



// Create a new store instance.
export const store = createStore({
    state() {
        return {
            count: 0,
            title: 'abdallah'
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        changeTitle(state) {
            state.title = 'waleed valencia'

        }
    }
});

createApp(App).use(store).use(router).mount("#app");
