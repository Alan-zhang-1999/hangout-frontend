import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
/*import axios from 'axios'*/

//axios.defaults.baseURL='http://localhost:'

/*createApp(App).config.globalProperties.$axio = axios*/

createApp(App).use(ElementPlus).use(router).mount('#app')
