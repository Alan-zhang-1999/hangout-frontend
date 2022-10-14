<template>
    <el-row>
        <el-button type="primary" @click="back">Back</el-button>
        <el-button type="primary" v-if="user.loginStatus && !check" @click="joinEvent">Join</el-button>
        <el-button type="primary" v-if="user.loginStatus && check" @click="leaveEvent">Leave</el-button>
        <!-- <el-button type="primary" v-if="user.loginStatus" @click="toggleEvent" ref="btnToggle">{{check ?  "Leave" : "Join"}}</el-button> -->

    </el-row>
    
    <div class="page">
        <p>{{event.name}}</p>
        <p>{{event.location}}</p>
        <p>{{formatDate(event.time)}}</p>
        <p>{{event.topic}}</p>
        <p>{{event.information}}</p>
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
                check: false
            }
        },
        mounted: async function() {
            this.getEventDetail(this.$route.params.id);
            this.user = await checkLoginStatus();
            if (this.user.loginStatus) {
                this.id = await getUserId(this.user.email);
                await this.checkUserInEvent();
            }
        },
        watch: {
			$route(){
				this.getEventDetail(this.$route.params.id);
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
            toggleEvent() {
                if (this.check) {
                    this.leaveEvent();
                } else {
                    this.joinEvent();
                }
            }
            
        }
        
    }

</script>