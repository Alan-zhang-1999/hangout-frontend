<template>
    <el-row>
        <el-button type="primary" @click="back">Back</el-button>
        <el-button type="primary" v-if="user.loginStatus && !check" @click="joinEvent">Join</el-button>
        <el-button type="primary" v-if="user.loginStatus && check" @click="leaveEvent">Leave</el-button>
    </el-row>
    
    <div class="container">
        <p>{{event.name}}</p>
        <p>{{event.location}}</p>
        <p>{{formatDate(event.time)}}</p>
        <p>{{event.topic}}</p>
        <p>{{event.information}}</p>
    </div>

    <div v-for="user in users" @click="getUserProfile(user.email)" style="width:100px; height: 50px; border: 1px 1px;">
        <p>{{user.username}}</p>
        <!-- <p>{{user.email}}</p> -->
    </div>
</template>
<script>
    import { checkLoginStatus, getUserId, formatDate } from '../util.js'
    export default {
        data(){
            return{
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
        mounted: async function() {
            this.getEventDetail(this.$route.params.id);
            this.user = await checkLoginStatus();
            await this.getAllEventUsers(this.$route.params.id);
            if (this.user.loginStatus) {
                this.id = await getUserId(this.user.email);
                await this.checkUserInEvent();
            }
        },
        watch: {
			$route(){
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
                        url: "/api/event/"+id,
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
            getAllEventUsers(id) {
                this.axios({
                    url: "/api/event/users",
                    method: "get",
                    params: {
                        "eventId": id
                    }
                }).then(response => {
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