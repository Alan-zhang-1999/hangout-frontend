<template>
    <h1>Events Page</h1>
    <el-button type="primary" @click="toCreateEvent" round>Create Event</el-button>
</template>
<script>
    export default{
        data(){

        },
        methods:{
            toCreateEvent(){
                this.$router.push('/createEvent')
            }
        }
    }
</script>