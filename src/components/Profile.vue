<template>
    <div class="page">
        <div class="p-info" >
            <div class="profile-article">
                <div class="base">
                    <div class="avator">
                        <n-avatar round
                                  :size="100"
                                  :src="this.userProfile.background" />
                    </div>
                    <div class="info">
                        <div class="name"><p><el-icon><User /></el-icon>{{this.user.email}}</p></div>
                        <div class="name" v-if="this.userProfile.gender == 'male'"><el-tag><p><el-icon><Male /></el-icon>{{this.userProfile.gender}}</p></el-tag></div>
                        <div class="name" v-else-if="this.userProfile.gender == 'female'"><el-tag type="danger"><p><el-icon><Female /></el-icon>{{this.userProfile.gender}}</p></el-tag></div>
                        <div class="name"><el-tag  type="warning"><el-icon><Location /></el-icon>{{this.userProfile.birthday}}</el-tag></div>
                        <el-tag  type="success">{{this.userProfile.job}}</el-tag>
                        <div class="name"><el-tag  type="info"><el-icon><Location /></el-icon>{{this.userProfile.location}}</el-tag></div>
                        <div >{{this.userProfile.biography}}</div>
                    </div>

                    <el-icon  @click="editProfile" >
                        <Edit />
                    </el-icon>

                </div>
            </div>
            <div class="follow">
                <el-button type="info">Follower {{followerNum}}</el-button>
                <el-button type="info">Following {{followNum}}</el-button>
                <el-button type="info">Interests </el-button>
            </div>
            <div class="buttons">
               
                <n-tabs type="line" animated >
                    <n-tab-pane name="likes" tab="Likes">
                        <div v-for="event in events" class="event-container" @click="getEventDetail(event.id)">

                            <!-- <img src="{{ event.img}}"/> -->
                            <p>Name: {{ event.name }}</p>
                            <p>Date: {{formatDate(event.time)}}</p>
                            <p>Location: {{event.location}}</p>

                            <!-- <p>Topic: {{event.topic}}</p>
    <p>Description: {{event.information}}</p> -->
                        </div>
                    </n-tab-pane>
                    <n-tab-pane name="subscribes" tab="Subscribes">
                        <div v-for="event in events" class="event-container" @click="getEventDetail(event.id)">

                            <!-- <img src="{{ event.img}}"/> -->
                            <p>Name: {{ event.name }}</p>
                            <p>Date: {{formatDate(event.time)}}</p>
                            <p>Location: {{event.location}}</p>

                            <!-- <p>Topic: {{event.topic}}</p>
    <p>Description: {{event.information}}</p> -->
                        </div>
                    </n-tab-pane>
                    <n-tab-pane name="history" tab="History">
                        <div v-for="event in events" class="event-container" @click="getEventDetail(event.id)">

                            <!-- <img src="{{ event.img}}"/> -->
                            <p>Name: {{ event.name }}</p>
                            <p>Date: {{formatDate(event.time)}}</p>
                            <p>Location: {{event.location}}</p>

                            <!-- <p>Topic: {{event.topic}}</p>
    <p>Description: {{event.information}}</p> -->
                        </div>
                    </n-tab-pane>
                    <n-tab-pane name="calendar" tab="Calendar">
                        <div v-for="event in events" class="event-container" @click="getEventDetail(event.id)">

                            <!-- <img src="{{ event.img}}"/> -->
                            <p>Name: {{ event.name }}</p>
                            <p>Date: {{formatDate(event.time)}}</p>
                            <p>Location: {{event.location}}</p>

                            <!-- <p>Topic: {{event.topic}}</p>
    <p>Description: {{event.information}}</p> -->
                        </div>
                    </n-tab-pane>
                </n-tabs>

            </div>
        </div>
    </div>
</template>
<script>

    import { checkLoginStatus, getUserId, formatDate } from '../util.js'


    export default {

        data(){
            return {
                name:"xx",
                id:"132",
                birthday: "123",
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                sizeList: ["large"],
                events: [],
                keyword: "",
                user: {},
                userProfile:{},
                eventId: 0,
                followNum: "",
                followerNum: "",
            }
        },
        mounted: async function () {
            this.user = await checkLoginStatus();
            if (this.user.loginStatus) {
                this.id = await getUserId(this.user.email);
            }
            this.getEvents();
            this.getFollowNum();
            this.getFollowerNum();
            this.getuserProfile();
        },
        watch: {
            $route() {
                this.getEvents();
                this.getFollowNum();
                this.getFollowerNum();
                this.getuserProfile();
            }
        },
        methods: {
            toCreateEvent() {
                this.$router.push('/createEvent')
            },
            serachEvent() {
                this.axios({
                    url: "/api/event/search",
                    method: "get",
                    params: {
                        "keyword": this.keyword
                    }
                }).then(response => {
                    this.events = response.data
                })
            },
            editProfile(){
                this.$router.push({
                    name:'Edit',
                    params: {email: this.user.email}
                })
            },
            getEventDetail(eventId) {
                this.$router.push('/eventdetail/' + eventId)
            },
            getEvents() {
                this.axios({
                    url: "/api/event/all",
                    method: "get",
                }).then(response => {
                    this.events = response.data;
                })
            },
            getFollowNum() {
                this.axios({
                    url: "/api/follow/followCounts/"+this.id,
                    method: "get",
                }).then(response => {
                    this.followNum = response.data;
                })
            },
            getFollowerNum() {
                this.axios({
                    url: "/api/follow/followerCounts/"+this.id,
                    method: "get",
                }).then(response => {
                    this.followerNum = response.data;
                })
            },
            getPastEvents() {
                this.axios({
                    url: "/api/event/past",
                    method: "get",
                }).then(response => {
                    this.events = response.data;
                })
            },
            getCurrentEvents() {
                this.axios({
                    url: "/api/event/current",
                    method: "get",
                }).then(response => {
                    this.events = response.data;
                })
            },
            getJoinedEvents() {
                this.axios({
                    url: "/api/event/joined/" + this.user.email,
                    method: "get",
                }).then(response => {
                    this.events = response.data;
                })
            },
            formatDate(date) {
                return formatDate(date)
            },
            getuserProfile(){
                console.log(this.email)
                this.axios({
                    url: "/api/userProfile/" + this.user.email,
                    method: "get",
                }).then(response => {
                    console.log(response.data);
                    this.userProfile = response.data;
                    if(this.userProfile.background == ""){
                        this.userProfile.background = "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg";
                    }
                    console.log(this.userProfile.background);
                })
            },
        }
    }
</script>
<style>
    .page {
        text-align: center;
        background-color: rgb(234,238,231);
  
    }
    .profile-article{
        text-align:center;
        margin:auto;

		width: 66%;
		height: auto;
		padding: 5px;
		border: 1px solid;
    }
    .base {
       
        display: flex;
    }
    .follow{
        padding:20px 0 20px 0;
    }
    .avator {
        padding: 40px 0 40px 60px;
    }
    .info {
        font-size: 20px;
        padding: 40px 0 0 120px;
    }
    .buttons {
        height: auto;
        width: 66%;
        margin: auto;
        align-items: center;
        justify-content: center;
        
    }
    .event-container {
        float: left;
        width: 28%;
        height: 100px;
        margin: 10px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 4px 8px;
        border-radius: 10px;
        display: block;
        /* background-color: white; */
    }

        .event-container:hover {
            box-shadow: rgba(0, 0, 0, 0.16) 0px 8px 16px;
        }

</style>