import { createApp } from 'vue'
import Vue from "vue"
import App from './App.vue'
import router from './router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'

// import Axios from 'axios'
import axios from 'axios'

// Vue.prototype.$axios = Axios
// Axios.defaults.baseURL = "/api"
const app = createApp(App)
for (const name in ElIcons) {
	app.component(name, ElIcons[name])
}
axios.defaults.withCredentials = true
app.config.globalProperties.axios=axios

app.use(ElementPlus).use(router).mount('#app')



export async function checkLoginStatus() {
    var data = {
        loginStatus: false,
		email: "",
        background: "",
        biography: "",
        bithday: "",
        gender: "",
        job: "",
        location: "",
    };
    const response = await axios({
        url: "/api/user/isLogin",
        method: "get",
    }).then(response => {
        return response.data;
    });    
	data.loginStatus = response.status;
    if (response.email != null) {
		data.email = response.email;
		// console.log(data.email);
        const res =  await axios({
            url: "/api/userProfile/" + response.email,
            method: "get",
        }).then(response => {
            data.background = response.data.background
            data.biography = response.data.biography
            data.bithday = response.data.bithday
            data.gender = response.data.gender
            data.job = response.data.job
            data.location = response.data.location
            return data;
        })
		return res;
    } else {
        return data;
    }
}