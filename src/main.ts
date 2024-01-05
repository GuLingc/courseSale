import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import ELementPlus from "element-plus"
import "element-plus/dist/index.css"
import 'video.js/dist/video-js.css'
const app = createApp(App)
app.use(router)
app.use(ELementPlus)
app.mount('#app')
