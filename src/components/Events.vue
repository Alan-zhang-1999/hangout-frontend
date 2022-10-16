<template>
    <div class="container">
        <el-row class="row-form">
            <el-form ref="form">
                <el-form-item>
                    <el-input clearable placeholder="search event" v-model="keyword">
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="searchEvent(keyword);">Search&nbsp;
                <el-icon :size="size" :color="color">
                    <search />
                </el-icon>
            </el-button>
            <el-button type="primary" v-if="user.loginStatus" @click="toCreateEvent">Create Event</el-button>

        </el-row>

        <div class="show" v-if="events.length != 0">
            
            <article v-for="event in events" class="events-container" @click="getEventDetail(event.id)">
                <!--<img :src="event.backgroundImage"/>-->
                <div class="events-img">
                    <img :src="event.backgroundImage"/>
                </div>
                <div class="infor">
                    <p><el-icon><Tickets /></el-icon>&nbsp;&nbsp;{{ event.name }}</p>
                    <p><el-icon><Calendar /></el-icon>&nbsp;&nbsp;{{formatDate(event.time)}}</p>
                    <p><el-icon><Location /></el-icon>&nbsp;&nbsp;{{event.location}}</p>
                </div>
            </article>
        </div>
        <h2 v-else>There are no events you want.</h2>
        <div class="show" v-if="guessYouLike.length != 0">
            <h2>Guess You Like</h2>
            <div v-for="event in guessYouLike" class="events-container" @click="getEventDetail(event.id)">
                <div class="events-img">
                    <img :src="event.backgroundImage"/>
                </div>
                <div class="infor">
                    <p>Name: {{ event.name }}</p>
                    <p>Date: {{formatDate(event.time)}}</p>
                    <p>Location: {{event.location}}</p>
                </div>
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
            if (this.$route.params.input_text!='-'){
                this.searchEvent(this.$route.params.input_text);
            } else {
                this.getEvents();
            }
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
                if (keyword != "") {
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
                    this.keyword = "";
                }
                
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
                this.guessYouLike = [];
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

    .events-container {

        float: left;
		width: 420px;
		height: 120px;
        padding:14px;
        margin:10px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 4px 8px;
        border-radius:10px;    
        display:flex;
        background-color: #ecf1f6;
        align-items: center;
        justify-content: center;
    }
    .events-img {
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .events-img img {
        width: 100%;
    height: auto;

    }
    .infor{
        margin-left:30px;
    }


</style>