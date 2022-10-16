<template>
    <div class="page">
        <div class="p-info">
            <div class="profile-article">
                <div class="base">
                    <div class="avator">
                        <n-avatar round
                                  :size="100"
                                  :src="this.viewUser.background" /><br/><br/>
                                  <div class = "biography">Biography: {{this.viewUser.biography}}</div>
                    </div>
                    <div class="info">
                        <div class="name"><p><el-icon><User /></el-icon>{{this.username}}</p></div>
                        <div class="name" v-if="this.viewUser.gender == 'male'"><el-tag><p><el-icon><Male /></el-icon>{{this.viewUser.gender}}</p></el-tag></div>
                        <div class="name" v-else-if="this.viewUser.gender == 'female'"><el-tag type="danger"><p><el-icon><Female /></el-icon>{{this.viewUser.gender}}</p></el-tag></div>
                        <div class="name"><el-tag  type="warning"><el-icon><Calendar /></el-icon>{{formatDate(this.viewUser.birthday).split(" ")[0]}}</el-tag></div>
                        <div class="name"><el-tag  type="success">{{this.viewUser.job}}</el-tag></div>
                        <div class="name"><el-tag  type="info"><el-icon><Location /></el-icon>{{this.viewUser.location}}</el-tag></div>
                        
                    </div>

                    <el-icon  v-if="isMyProfile==true" @click="editProfile" >
                        <Edit />
                    </el-icon>
                    <el-icon v-if="isMyProfile!=true" class="el-icon-share" style="margin-left: 10px; font-size: 16px; cursor: pointer"
                             @click="chatWithHim()"><ChatDotRound /></el-icon>
                </div>
            </div>
            <div class="follow">
                <el-button type="info">Follower {{followerNum}}</el-button>
                <el-button type="info">Following {{followNum}}</el-button>
                <!-- <el-button type="info">Interests </el-button> -->
            </div>
            <div class="buttons">

                <n-tabs type="line" animated>
                    <n-tab-pane name="calendar" tab="Calendar">
                        <el-calendar>
                            <template #date-cell="{data}">
                                <p>
                                    {{ data.day.split('-').slice(1).join('-') }}<br />
                                    <div v-for="name in dealMyDate(data.day)">
                                        {{ name }}<br />
                                    </div>
                                </p>
                            </template>
                        </el-calendar>
                    </n-tab-pane>
                    <n-tab-pane name="MyGroups" tab="MyGroups">
                        <div v-for="group in userGroups" class="event-container" @click="getGroupDetail(group.id)">

                            <!-- <img src="{{ group.img}}"/> -->
                            <p>Name: {{ group.name }}</p>
                            <p>Date: {{formatDate(group.time, 'YYYY-MM-DD')}}</p>
                            <p>Location: {{group.location}}</p>

                            <!-- <p>Topic: {{group.topic}}</p>
    <p>Description: {{group.information}}</p> -->
                        </div>
                    </n-tab-pane>
                    <n-tab-pane name="subscribes" tab="Subscribes">
                        <div v-for="event in currentEvents" class="event-container" @click="getEventDetail(event.id)">

                            <!-- <img src="{{ event.img}}"/> -->
                            <p>Name: {{ event.name }}</p>
                            <p>Date: {{formatDate(event.time, 'YYYY-MM-DD')}}</p>
                            <p>Location: {{event.location}}</p>

                            <!-- <p>Topic: {{event.topic}}</p>
    <p>Description: {{event.information}}</p> -->
                        </div>
                    </n-tab-pane>
                    <n-tab-pane name="history" tab="History">
                        <div v-for="event in pastEvents" class="event-container" @click="getEventDetail(event.id)">

                            <!-- <img src="{{ event.img}}"/> -->
                            <p>Name: {{ event.name }}</p>
                            <p>Date: {{formatDate(event.time, 'YYYY-MM-DD')}}</p>
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
                events: [],
                user: {},
                viewUser:{},
                eventId: 0,
                followNum: "",
                followerNum: "",
                userId: "",
                isMyProfile: false,
                profile: "",
                username: '',
                userGroups: []
            }
        },
        mounted: function () {
            this.initData()
        },
        watch: {
            $route() {
                this.initData()    
            }
            //maximun two events in a calendar day
        },

        methods: {
            dealMyDate(v) {
            var ret = [];
            for (let i = 0; i < this.events.length; i++) {
                if (this.formatDate(this.events[i].time).split(" ")[0] == v) {
                    ret.push(this.events[i].name);
                }
            }
            //maximun two events in a calendar day
            return ret.slice(0, 2);
        },
            async initData() {
                this.userId = this.$route.params.userId
                this.user = await checkLoginStatus();
                console.log("))))", this.user)
                if (this.user.loginStatus) {
                    this.user.id = await getUserId(this.user.email);
                }
                console.log("this.userId this.user.id", this.userId, this.user.id, this.userId == this.user.id)
                if (this.userId == this.user.id){
                    this.isMyProfile = true
                   
                    this.viewUser = this.user
                    console.log("###", this.viewUser)
                } else {
                    this.isMyProfile = false
                    this.viewUser = await this.getUserById()
                    console.log("@@@", this.viewUser)
                }
                console.log(this.viewUser.email)
                await this.getUserProfile(this.viewUser.email)
                await this.getUserGroups();
                this.username = this.viewUser.username
                console.log("profile", this.viewUser, this.user)
                this.getEvents();
                this.getPastEvents();
                this.getCurrentEvents();
                this.getFollowNum();
                this.getFollowerNum();
                this.getUserGroups();
            },
            chatWithHim() {
                console.log("chatWithHim")
                console.log(this.user.id, this.viewUser.id)
                this.axios({
                    url: "/api/message/sendMessage",
                    method: "post",
                    data: {
                        "userId": this.user.id,
                        "toUserId": this.viewUser.id,
                        "content": "Let's have a chat!",
                        "time": formatDate(new Date())
                    }
                }).then(response => {
                    console.log(response.data)
                    this.$router.push('/Im')
                })
            },
            getUserProfile(email) {
                this.axios({
                    url: "/api/userProfile/" + email,
                    method: "get",
                }).then(response => {
                    console.log(response.data);
                    this.profile = response.data
                })
            },
            getUserById(userId) {
                return this.axios({
                    url: "/api/getUserById/"+this.userId,
                    method: "get"
                }).then(res=> {
                    // this.viewUser = res.data
                    console.log("getUserById", this.viewUser)
                    return res.data
                })
            },
            toCreateEvent() {
                this.$router.push('/createEvent')
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
            getGroupDetail(groupId) {
                this.$router.push('/GroupDetail/' + groupId)
            },
            getEvents() {
                this.axios({
                    url: "/api/event/getUserEvent/"+this.viewUser.id,
                    method: "get",
                }).then(response => {
                    this.events = response.data;
                })
            },
            getFollowNum() {
                console.log("getFollowNum", this.viewUser.id)
                this.axios({
                    url: "/api/follow/followCounts/"+this.viewUser.id,
                    method: "get",
                }).then(response => {
                    this.followNum = response.data;
                    
                })
            },
            getFollowerNum() {
                console.log("getFollowerNum", this.viewUser.id)

                this.axios({
                    url: "/api/follow/followerCounts/"+this.viewUser.id,
                    method: "get",
                }).then(response => {
                    this.followerNum = response.data;
                })
            },
            getPastEvents() {
                this.axios({
                    url: "/api/event/past/"+this.viewUser.id,
                    method: "get",
                }).then(response => {
                    this.pastEvents = response.data;
                })
            },
            getCurrentEvents() {
                this.axios({
                    url: "/api/event/current/"+this.viewUser.id,
                    method: "get",
                }).then(response => {
                    this.currentEvents = response.data;
                })
            },
            
            getUserGroups() {
                this.axios({
                    url: "/api/group/getUserGroup/"+this.viewUser.id,
                    method: "get",
                }).then(response => {
                    this.userGroups = response.data;
                })
            },
            getJoinedEvents() {
                this.axios({
                    url: "/api/event/joined/" + this.viewUser.email,
                    method: "get",
                }).then(response => {
                    this.events = response.data;
                })
        },
        formatDate(date) {
            return formatDate(date)
        }
    }
}
</script>
<style>
.page {
    text-align: center;
    background-color: rgb(234, 238, 231);

}

.profile-article {
    text-align: left;
    margin: auto;

    width: 66%;
    height: auto;
    padding: 5px;
    border: 1px solid;
}

.base {

    display: flex;
}

.follow {
    padding: 20px 0 20px 0;
}

.avator {
    padding: 40px 0 40px 60px;
}

.info {
    position: relative;
    float: left;
    font-size: 20px;
    padding: 40px 0 0 120px;
}

.biography{
    font-size:13px;
    color:rgb(116, 113, 113);
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