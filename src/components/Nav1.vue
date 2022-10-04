<template>
    <div class="nav-box">
        <el-menu class="nav-menu" mode="horizontal"  >
            <img src="" alt="Hangout"/>
            <el-menu-item><router-link to="/Home">Home</router-link></el-menu-item>
            <el-menu-item><router-link to="/Group">Group</router-link></el-menu-item>
            <el-menu-item><router-link to="/Events">Events</router-link></el-menu-item>
            <el-menu-item><router-link to="/Profile">Profile</router-link></el-menu-item>
            <el-menu-item><router-link to="" class="login-link" ></router-link></el-menu-item>
            <el-menu-item><router-link to="/Login" >Login</router-link></el-menu-item>
            <el-menu-item class="bb"><el-button type="primary" @click="goSignUp" class="btn-sign" size="medium">SignUp</el-button></el-menu-item>
        </el-menu>
    </div>
    <router-view></router-view>
  </template>

<script>
    export default{
        name: "nav1",
        methods: {
            goSignUp(){
                this.$router.push('/SignUp')
            }
        }
    }
</script>
<style>
    .nav-box{
        position:relative;
        
        border:1px solid;
        padding-left: 30px;
    }
    .nav-menu{
        margin:10px;
        padding-top: 10px;
        padding-left: 20px;
    }
    .login-link{
        position: relative;
        padding-left:800px;
    }
    .bb{
        position: relative;
        padding-top: 10px;
    }
</style>