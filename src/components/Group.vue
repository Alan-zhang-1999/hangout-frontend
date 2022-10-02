<template>
    <h1>Groups page</h1>
    
    <el-button type="warning" @click="toCreateGroup" round>Create Group</el-button>
</template>
<script>
    export default{
        data(){

        },
        methods:{
            toCreateGroup(){
                this.$router.push('/createGroup')
            }
        }
    }
</script>