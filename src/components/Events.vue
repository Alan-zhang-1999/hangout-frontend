<template>
    <div class="container">
        <el-row>
            <el-form ref="form">
                <el-form-item>
                    <el-input placeholder="search event" v-model="keyword">
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="searchEvent(keyword);">Search&nbsp;
                <el-icon :size="size" :color="color">
                    <search />
                </el-icon>
            </el-button>
            <el-button type="primary" @click="toCreateEvent">Create Event</el-button>

        </el-row>
        <el-row>
            <el-button type="primary" @click="getEvents">All</el-button>
            <el-button type="primary" @click="getPastEvents">Past</el-button>
            <el-button type="primary" @click="getCurrentEvents">Current</el-button>
            <el-button type="primary" v-if="user.loginStatus" @click="getJoinedEvents">Joined</el-button>

        </el-row>
        <div class="show" v-if="events.length != 0">
            <div v-for="event in events" class="event-container" @click="getEventDetail(event.id)">
                <p>Name: {{ event.name }}</p>
                <p>Date: {{formatDate(event.time)}}</p>
                <p>Location: {{event.location}}</p>
            </div>
        </div>
        <div class="show" v-if="guessYouLike.length != 0">
            <h2>Guess You Like</h2>
            <div v-for="event in guessYouLike" class="event-container" @click="getEventDetail(event.id)">
                <p>Name: {{ event.name }}</p>
                <p>Date: {{formatDate(event.time)}}</p>
                <p>Location: {{event.location}}</p>

            </div>
        </div>
        </div>



</template>
<script>
    import { checkLoginStatus, getUserId, formatDate } from '../util.js'

    export default {
        data() {
            return {
                events: [],
                guessYouLike: [],
                keyword: "",
                user: {},
                id: 0
            }
        },
        mounted: async function () {
            this.user = await checkLoginStatus();
            if (this.user.loginStatus) {
                this.id = await getUserId(this.user.email);
            }
            this.getEvents();
        },
        watch: {
            $route() {
                if (this.$route.params.input_text!='-'){
                    this.searchEvent(this.$route.params.input_text);
                } else {
                    this.getEvents();
                }
            }
        },
        methods: {
            toCreateEvent() {
                this.$router.push('/CreateEvent')
            },
            searchEvent(keyword) {
                this.axios({
                    url: "/api/event/search",
                    method: "get",
                    params: {
                        "keyword": keyword
                    }
                }).then(response => {
                    console.log("search", keyword)
                    this.events = response.data.related
                    this.guessYouLike = response.data.guessYouLike
                })
            },
            getEventDetail(id) {
                this.$router.push('/eventdetail/' + id)
            },
            getEvents() {
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
                    url: "/api/event/joined/" + this.user.email,
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
    .show {
        overflow: hidden;
    }

</style>