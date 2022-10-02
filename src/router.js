import {createRouter, createWebHashHistory} from "vue-router"
import Home from "./components/Home"
import Group from "./components/Group"
import Event from "./components/Events"
import Profile from "./components/Profile.vue"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import groupdetails from "./components/groupdetail.vue"
import eventdetails from "./components/eventdetail.vue"
import createGroup from "./components/createGroup.vue"
import createEvent from "./components/createEvent.vue"

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
            path: "/Group",
            component: Group 
        },
        { 
            path: "/Events",
            component: Event 
        },
        { 
            path: "/Profile",
            component: Profile 
        },
        { 
            path: "/groupdetails",
            component: groupdetails 
        },
        { 
            path: "/eventdetails",
            component: eventdetails 
        },
        { 
            path: "/createGroup",
            component: createGroup  
        },
        { 
            path: "/createEvent",
            component: createEvent  
        },
        {
            path: "/login", 
            component: Login
        },
        {
            path: "/SignUp", 
            component: SignUp
        }
    ]
});

export default router;