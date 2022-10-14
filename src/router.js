import {createRouter, createWebHashHistory} from "vue-router"
import Home from "./components/Home"
import Group from "./components/Group"
import Event from "./components/Events"
import Profile from "./components/Profile.vue"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import groupdetails from "./components/groupdetail.vue"
import EventDetail from "./components/EventDetail.vue"
import createGroup from "./components/createGroup.vue"
import CreateEvent from "./components/CreateEvent.vue"
import Im from "./components/Im.vue"

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
            path: "/eventdetail/:id",
            component: EventDetail
        },
        { 
            path: "/createGroup",
            component: createGroup  
        },
        { 
            path: "/CreateEvent",
            component: CreateEvent  
        },
        {
            path: "/login", 
            component: Login
        },
        {
            path: "/SignUp", 
            component: SignUp
        },
        {
            path: "/Im",
            component: Im
        }
    ]
});

export default router;