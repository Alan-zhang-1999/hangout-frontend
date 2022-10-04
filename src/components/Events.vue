<template>
    <h1>Events Page</h1>
    <el-row>
        <el-form ref="form">
            <el-form-item>
                <el-input placeholder="search event" v-model="email">
                </el-input>
            </el-form-item>
            <el-button icon="el-icon-search" circle></el-button>
            <el-button type="primary" @click="toCreateEvent" round>Create Event</el-button>
        </el-form>
    </el-row>
    <div>
        <li v-for="event in events">
            <img src="{{ event.img}}"/>
            <p>{{ event.name }}</p>
            <p>{{event.date}}</p>
            <p>{{event.location}}</p>
        </li>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                newevent:"",
                events: [
                    {
                        id: "",
                        name: "xxxx",
                        date: "yy-mm-dd",
                        location: "hotel",
                        img: "",
                    },
                    {

                    }
                ]
            }
        },
        methods:{
            toCreateEvent(){
                this.$router.push('/createEvent')
            }
        }
    }
</script>