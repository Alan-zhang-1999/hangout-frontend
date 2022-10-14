<template>
    <div class="signup-box">
        <el-form ref="form" :model="form" label-width="60px" class = "signup-form">
            <el-form-item label="Username">
                <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="email" type="email">"Email""></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit" class="signup-button">Redister</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                username: "",
                password: "",
                email: ""
            }
        },
        methods:{
            onSubmit(){
                this.axios({
                    url: "/api/register",
                    method: "post",
                    data: {
                        "username": this.username,
                        "password": this.password,
                        "email": this.email
                    }
                }).then(response => {
                    console.log(response.data)
                    if (response.data.status) {
                        this.$message({
                            message: response.data.message,
                            type: 'success',
                            duration: 1500,
                            offset: 80
                        });
                        this.axios({
                            url: "/api/login",
                            method: "post",
                            data: {
                                "email": this.email,
                                "password": this.password
                            }
                        }).then(() => {
                            this.$router.push('/Home')
                        })
                    } else {
                        this.$message({
                            message: response.data.message,
                            type: 'error',
                            duration: 1500,
                            offset: 80
                        });
                    }
                })
            }
        }
    }
</script>
<style>
    .signup-form{
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
    .signup-box{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #ccc;
    }
    .signup-button{
        
        width:90%;
    }  
</style>