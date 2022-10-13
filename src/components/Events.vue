<template>
    <!-- <h1>Events Page</h1> -->
    <div class="page">
        <el-row>
            <el-form ref="form">
                <el-form-item>
                    <el-input placeholder="search event" v-model="keyword">
                    </el-input>
                </el-form-item>  
                
            </el-form>
            <el-button type="primary" @click="serachEvent">Search&nbsp;
                <el-icon :size="size" :color="color">
                    <search />
                </el-icon></el-button>
            <el-button type="primary" @click="toCreateEvent">Create Event</el-button>
            
        </el-row>
        <el-row>
            <el-button type="primary" @click="getEvents">All</el-button>
            <el-button type="primary" @click="getPastEvents">Past</el-button>
            <el-button type="primary" @click="getCurrentEvents">Current</el-button>
            <el-button type="primary" v-if="user.loginStatus" @click="getJoinedEvents">Joined</el-button>

        </el-row>
        <div class="show">
            <div v-for="event in events" class="event-container" @click="getEventDetail(event.id)">

            <!-- <img src="{{ event.img}}"/> -->
                <p>Name: {{ event.name }}</p>
                <p>Date: {{formatDate(event.time)}}</p>
                <p>Location: {{event.location}}</p>

            <!-- <p>Topic: {{event.topic}}</p>
            <p>Description: {{event.information}}</p> -->
            </div>
        </div>
        </div>


</template>
<script>
    import { checkLoginStatus, getUserId, formatDate } from '../main.js'

    export default{
        data(){
            return{
                events: [],
                keyword: "",
                user: {},
                id: 0
            }
        },
        mounted: async function() {
            this.user = await checkLoginStatus();
            if (this.user.loginStatus) {
                this.id = await getUserId(this.user.email);
            }            
            this.getEvents();
        },
        watch: {
			$route(){
				this.getEvents();
			}
		},
        methods:{
            toCreateEvent(){
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
            getEventDetail(id) {
                this.$router.push('/eventdetail/'+id)
            },
            getEvents(){
                this.axios({
                    url: "/api/event/all",
                    method: "get",
                }).then(response => {
                    this.events = response.data;
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
                    url: "/api/event/joined/"+this.user.email,
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
        background-color: rgb(255,247,237);
        padding: 20px;
    }
    .show {
        overflow: hidden;
    }
    .event-container {

        float: left;
		width: 400px;
		height: 200px;
        margin:10px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 4px 8px;
        border-radius:10px;    
        display: block;
        /* background-color: white; */

    }
    
    .event-container:hover {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 8px 16px;
    }

</style>