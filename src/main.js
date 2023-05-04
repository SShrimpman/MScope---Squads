import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true
}

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Toast, toastOptions);
app.mount('#app')
