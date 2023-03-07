import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import pinia from './stores'
import router from './router'
import 'virtual:svg-icons-register'

import 'vant/lib/index.css'
import './styles/main.scss'

// import persist from 'pinia-plugin-persistedstate'


const app = createApp(App)

// app.use(createPinia().use(persist))
app.use(router)
app.use(pinia)
app.mount('#app')
