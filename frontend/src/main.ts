import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router  from './assets/js/router'
import './assets/css/main.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).mount('#app')
