<template>
    <div class="page">

        <el-button type="primary" @click="back" style="float:left">Back</el-button>
        <el-button type="primary" v-if="user.loginStatus && !check" @click="joinEvent" style="float:left">Join
        </el-button>
        <el-button type="primary" v-if="user.loginStatus && check" @click="leaveEvent" style="float:left">Leave
        </el-button>
        <div class="main-ncard">

            <div class="main-img-tamplate">
                <img :src="event.backgroundImage" />

            </div>
            <div class="info">
                <p>{{event.name}}</p>
                <p>{{event.location}}</p>
                <p>{{formatDate(event.time)}}</p>
                <p>{{event.topic}}</p>
                <p>{{event.information}}</p>
            </div>



        </div>
        <h1 class="item-row"># Users</h1>

        <div class="users">
            <div class="user" v-for="user in users">
                <div class="icon">
                    <!--<n-avatar round
                :size="30"
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />-->
                    <el-avatar @click.native="goProfile(user.id)" :src="this.user.background">{{user.username.slice(0, 3)}}</el-avatar>
                </div>
                <div class="name">{{user.email}}</div>
            </div>
        </div>



    </div>
</template>
<script>
import { checkLoginStatus, getUserId, formatDate } from '../util.js'
export default {
    data() {
        return {
            event: {
                id: "",
                name: "",
                topic: "",
                location: "",
                information: "",
                time: "",
                backgroundImage: ""
            },
            id: 0,
            user: {},
            check: false,
            users: []
        }
    },
    mounted: async function () {
        this.getEventDetail(this.$route.params.id);
        this.user = await checkLoginStatus();
        await this.getAllEventUsers(this.$route.params.id);
        if (this.user.loginStatus) {
            this.id = await getUserId(this.user.email);
            await this.checkUserInEvent();
        }
    },
    watch: {
        $route() {
            this.getEventDetail(this.$route.params.id);
            this.getAllEventUsers(this.$route.params.id);
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        getEventDetail(id) {
            this.axios({
                url: "/api/event/" + id,
                method: "get",
            }).then(response => {
                console.log(response.data);
                this.event = response.data;
            })
        },
        formatDate(date) {
            return formatDate(date);
        },
        checkUserInEvent() {
            this.axios({
                url: "/api/event/check",
                method: "get",
                params: {
                    "userId": this.id,
                    "eventId": this.event.id
                }
            }).then(response => {
                this.check = response.data;
                return response.data;
            })

        },
        joinEvent() {
            this.axios({
                url: "/api/event/join",
                method: "post",
                params: {
                    "userId": this.id,
                    "eventId": this.event.id
                }
            }).then(response => {
                this.$router.go(0);
                console.log(response.data);
            })
        },
        leaveEvent() {
            this.axios({
                url: "/api/event/leave",
                method: "delete",
                params: {
                    "userId": this.id,
                    "eventId": this.event.id
                }
            }).then(response => {
                this.$router.go(0);
                console.log(response.data);
            })
        },
        goProfile(id) {
            this.$router.push("/Profile/"+id)
        },
        getAllEventUsers(id) {
            this.axios({
                url: "/api/event/users",
                method: "get",
                params: {
                    "eventId": id
                }
            }).then(response => {
                console.log("!!!!", response.data);
                this.users = response.data;
            })
        },
        getUserProfile(email) {
            this.axios({
                url: "/api/userProfile/" + email,
                method: "get",
            }).then(response => {
                console.log(response.data);
            })
        }

    }

}

</script>

<style>
.main-img-tamplate {
    width: 300px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(234, 238, 231);
}



.main-img-tamplate img {
    width: 100%;
    height: auto;
}
</style>