<template>
    <h1>Events Page</h1>
    <el-row>
        <el-form ref="form">
            <el-form-item>
                <el-input placeholder="search event" v-model="email">
                </el-input>
            </el-form-item>
            <el-button icon="el-icon-search" circle></el-button>

            <el-icon :size="size" :color="color">
                <search />
            </el-icon>
            <el-button type="primary" @click="toCreateEvent" round>Create Event</el-button>
        </el-form>
    </el-row>
    <div>
        <article v-for="event in events" class="cc">
            <img src="{{ event.img}}"/>
            <p>{{ event.name }}</p>
            <p>{{formatDate(event.time)}}</p>
            <p>{{event.location}}</p>
            <p>{{event.topic}}</p>
            <p>{{event.information}}</p>
        </article> 
    </div>
</template>
<script>
    import moment from 'moment'

    export default{
        data(){
            return{
                newevent:"",
                events: [
                    // {
                    //     id: "",
                    //     name: "xxxx",
                    //     date: "yy-mm-dd",
                    //     location: "hotel",
                    //     img: "",
                    // },
                    // {

                    // },
                    // {

                    // }
                ]
            }
        },
        mounted: function() {
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
            getEvents(){
                this.axios({
                    url: "/api/event/all",
                    method: "get",
                }).then(response => {
                    console.log(response.data)
                    this.events = response.data
                })
            },
            formatDate(date) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    }
</script>

<style>
    .cc{
        float:left;
		width: 45%;
		height: 200px;
		padding: 5px;
		box-shadow: 3px 3px 3px 2px #797979;
		margin: 1em 1em 1em 2.5em;
    }
</style>