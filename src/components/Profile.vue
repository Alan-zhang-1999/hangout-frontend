<template>
    <div class="p-info"> 
        <div>
            <img  alt= "icon" src=""/>
        </div>
        <div >
            <h1>Profile Page</h1>
            <p>{{name}}</p>
            <p>{{id}}</p>
            <p>{{birthday}}</p>
        </div>
        <div>
            <el-button type="info">Follower</el-button>
            <el-button type="info">Following</el-button>
            <el-button type="info">Interests</el-button>
        </div>
        <div>
            <router-link to="">Likes</router-link> |
            <router-link to="">Subscribes</router-link> |
            <router-link to="">History</router-link> |
            <router-link to="">Calendar</router-link>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                name:"xx",
                id:"132",
                birthday:"123",

            }
        }
    }
</script>