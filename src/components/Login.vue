<template>
    <div class="login-box">
        <el-form ref="form" label-width="60px" class = "login-form">
            <el-form-item label="Email">
                <el-input v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="Password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <router-link to="forget" class="L1">forget password?</router-link>
                <router-link to="SignUp" class="L2">Register</router-link>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" class="login-button">Login</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import axios from 'axios';
// axios.defaults.withCredentials = true
export default{
    data() {
        return {
            email: "",
            Password: ""
        }
    },
    methods:{
        onSubmit() {
            this.axios( {
                url: "/api/login",
                method: "post",
                data: {
                    "email": this.email,
                    "password": this.Password
                },
            }).then(response => {
                console.log(this.Password)
                console.log(response.data)
                this.$router.push('/Home')
            })
        }
    }
}
</script>
<style>
    .login-form{
        width: 400px;
        background-color: #fff;
        padding: 45px;
        padding-top:80px;
        padding-bottom:20px;
        height: 250px;
        border-radius: 20px;
        position: absolute;
        margin-top: -125px;
        margin-left: -175px;
        top:40%;
        left:45%;
    }
    .login-box{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #ccc;
    }
    .login-button{
        
        width:90%;
    }  
    .L1{
        position: relative;
        margin-left:-10px;
    }
    .L2{
        position: relative;
        margin-left:50%;
    }
</style>