import {createRouter, createWebHashHistory} from "vue-router"
import Home from "./components/Home"
import Group from "./components/Group"
import Event from "./components/Events"
import Profile from "./components/Profile.vue"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import GroupDetail from "./components/GroupDetail.vue"
import EventDetail from "./components/EventDetail.vue"
import CreateGroup from "./components/CreateGroup.vue"
import CreateEvent from "./components/CreateEvent.vue"
import Im from "./components/Im.vue"
import Updateprofile from "./components/Updateprofile"

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
            path: "/Group/:input_text",
            component: Group 
        },
        { 
            path: "/Events/:input_text",
            component: Event 
        },
        { 
            path: "/Profile/:userId",
            component: Profile 
        },
        { 
            path: "/GroupDetail/:id",
            component: GroupDetail 
        },
        { 
            path: "/eventdetail/:id",
            component: EventDetail
        },
        { 
            path: "/CreateGroup",
            component: CreateGroup  
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
        },
        {
            path:"/Updateprofile/:email",
            name:"Edit",
            component: Updateprofile
        },
    ]
});

export default router;