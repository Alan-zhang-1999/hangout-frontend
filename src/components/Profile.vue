<template>
    <div class="p-info" style="background-color: rgb(234,238,231)"> 
        <article class="profile-article">
            <div class="base">
                <el-col :span="12">
      <div class="sub-title">circle</div>
      <div class="demo-basic--circle">
        <div class="block" v-for="size in sizeList" :key="size">
          <el-avatar :size="size" :src="circleUrl"></el-avatar>
        </div>
      </div>
    </el-col>
                <p>{{name }}</p>
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
    /*import { ref, reactive, toRefs } from "vue"*/

    //const data = reactive({
    //    name: "test",
    //    id: "132",
    //    birthday: "123"
    //})




    export default {

        data(){
            return {
                name:"xx",
                id:"132",
                birthday: "123",
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                sizeList: ["large"]

            }
        }
    }
</script>
<style>
    .profile-article{
        float:none;
		width: auto;
		height: auto;
		padding: 5px;
		border: 1px solid;
		margin: 1em 1em 1em 2.5em;
    }
    .base{
        
    }
</style>