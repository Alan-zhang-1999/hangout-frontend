<template>
    <div class="p-info"> 
        <h1>Profile Page</h1>
        <article class="profile-article">
            <div class="base">
                <img  alt= "icon" src=""/>
                <p>{{name}}</p>
                <p>{{id}}</p>
                <p>{{birthday}}</p>
            </div>
        </article>
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
<style>
    .profile-article{
        float:none;
		width: 45%;
		height: 100px;
		padding: 5px;
		border: 1px solid;
		margin: 1em 1em 1em 2.5em;
    }
    .base{
        float: left;
    }
</style>