<template>
    <div class="page">
        <div class="p-info">
            <div class="profile-article">
                <div class="base">
                    <div class="avator">
                        <n-avatar round
                                  :size="150"
                                  :src="this.profile.background"
                                  fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" /><br/><br/>
                                  
                    </div>
                    <div class="info">
                        <div class="name" style="display: inline-block; margin-right: 50px;"><p><el-icon><User /></el-icon>&nbsp;{{this.username}}</p></div>
                        <div style="display: inline-block;"><el-icon  v-if="isMyProfile==true" @click="editProfile" ><Edit /></el-icon></div>
                        
                        <div class="name" v-if="this.profile.gender == 'male'"><el-tag><p><el-icon><Male /></el-icon>{{this.profile.gender}}</p></el-tag></div>
                        <div class="name" v-else-if="this.profile.gender == 'female'"><el-tag type="danger"><p><el-icon><Female /></el-icon>{{this.profile.gender}}</p></el-tag></div>
                        <div class="name"><el-tag type="warning"><el-icon><Calendar /></el-icon>{{formatDate(this.profile.birthday).split(" ")[0]}}</el-tag></div>
                        <div class="name"><el-tag type="success">{{this.profile.job}}</el-tag></div>
                        <div class="name"><el-tag type="info"><el-icon><Location /></el-icon>{{this.profile.location}}</el-tag></div>
                        <div class="name" style="margin-bottom: 50px;"><el-tag>Biography: {{this.profile.biography}}</el-tag></div>
                        
                    </div>

                    
                    <el-icon v-if="isMyProfile!=true" class="el-icon-share" style="margin-left: 10px; font-size: 16px; cursor: pointer"
                             @click="chatWithHim()"><ChatDotRound /></el-icon>
                </div>
            </div>

            <div class="buttons">

                <n-tabs type="line" animated>
                    <n-tab-pane name="calendar" tab="Calendar">
                        <el-calendar>
                            <template #date-cell="{data}">
                                    {{ data.day.split('-').slice(1).join('-') }}<br />
                                    <div v-for="name in dealMyDate(data.day)" >
                                        <n-ellipsis>{{ name }}</n-ellipsis><br />
                                    </div>
                            </template>
                        </el-calendar>
                    </n-tab-pane>
                    <n-tab-pane name="MyGroups" tab="MyGroups">
                        <div v-for="group in userGroups" class="event-container" @click="getGroupDetail(group.id)">

                            <p>Name: {{ group.name }}</p>
                            <p>Date: {{formatDate(group.time, 'YYYY-MM-DD')}}</p>
                            <p>Location: {{group.location}}</p>

                        </div>
                    </n-tab-pane>
                    <n-tab-pane name="subscribes" tab="Subscribes">
                        <div v-for="event in currentEvents" class="event-container" @click="getEventDetail(event.id)">

                            <p>Name: {{ event.name }}</p>
                            <p>Date: {{formatDate(event.time, 'YYYY-MM-DD')}}</p>
                            <p>Location: {{event.location}}</p>

                        </div>
                    </n-tab-pane>
                    <n-tab-pane name="history" tab="History">
                        <div v-for="event in pastEvents" class="event-container" @click="getEventDetail(event.id)">
                            
                            <p>Name: {{ event.name }}</p>
                            <p>Date: {{formatDate(event.time, 'YYYY-MM-DD')}}</p>
                            <p>Location: {{event.location}}</p>

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
                if (this.user.loginStatus) {
                    this.user.id = await getUserId(this.user.email);
                }
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
                this.profile = await this.getUserProfile(this.viewUser.email)
                this.userGroups = await this.getUserGroups()
                this.username = this.viewUser.username
                this.getEvents();
                this.getPastEvents();
                this.getCurrentEvents();
                this.getUserGroups();
            },
            chatWithHim() {
                console.log(this.user.id, this.viewUser.id)
                this.axios({
                    url: "/api/message/allMessages/" + this.viewUser.email,
                    method: "get"
                }).then(res => {
                    this.chatUser = false
                    for (var m in res.data){
                        var mes = res.data[m]
                        if (mes.email==this.viewUser.email || mes.toEmail==this.viewUser.email){
                            this.chatUser = true
                            break
                        }
                    }
                    if (this.chatUser){
                        this.$router.push('/Im')
                    } else {
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
                            this.$router.push('/Im')
                        })
                    }
                })
                
            },
            getUserProfile(email) {
                return this.axios({
                    url: "/api/userProfile/" + email,
                    method: "get",
                }).then(response => {
                    console.log('getUserProfile', response.data);
                    return response.data;
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
                return this.axios({
                    url: "/api/group/getUserGroup/"+this.viewUser.id,
                    method: "get",
                }).then(response => {
                    // this.userGroups = response.data;
                    return response.data
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