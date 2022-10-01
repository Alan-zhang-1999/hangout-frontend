import {createRouter, createWebHashHistory} from "vue-router"
import Home from "./components/Home"
import Login from "./components/Login"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { 
            path: "/", 
            component: Home
        },
        { 
            path: "/home",
            component: Home 
        },
        {
            path: "/login", 
            component: Login
        }
    ]
});

export default router;