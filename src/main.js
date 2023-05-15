import { createApp, markRaw } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { userLogin } from './stores/userLogin'

const toastOptions = {
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(({store}) => {store.router = markRaw(router)});

app.use(router)
app.use(pinia)
app.use(Toast, toastOptions);

if(localStorage.getItem('token')){
    (async () => {
        const auth = userLogin();
        try {
            auth.setIsAuth(true)
            await auth.checkToken();
        } catch (error) {
            auth.setIsAuth(false);
        }
    })()
}

app.mount('#app')
