import { createApp } from 'vue'
import Vue from "vue"
import App from './App.vue'
import router from './router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
import axios from 'axios'
import {
    // create naive ui
    create,
    // component
    NButton, NCard, NTabs, NTab, NTabPane, NAvatar
} from 'naive-ui'

const naive = create({
    components: [NButton, NCard, NTabs, NTab, NTabPane, NAvatar]
})
// Vue.prototype.$axios = Axios
// Axios.defaults.baseURL = "/api"
const app = createApp(App)
for (const name in ElIcons) {
    app.component(name, ElIcons[name])
}
axios.defaults.withCredentials = true
app.config.globalProperties.axios = axios

app.use(ElementPlus).use(router).use(naive).mount('#app')

