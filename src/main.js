import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/global.css'
require('./mock/index.js')

createApp(App).use(store).use(router).mount('#app')
