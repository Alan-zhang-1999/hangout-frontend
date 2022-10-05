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
        <article v-for="event in events" class="cc">
            <img src="{{ event.img}}"/>
            <p>{{ event.name }}</p>
            <p>{{event.date}}</p>
            <p>{{event.location}}</p>
        </article> 
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