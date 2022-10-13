<template>
    <div class="nav-box" style="background-color: rgb(234,238,231)">
        <el-menu class="nav-menu" mode="horizontal" style="background-color: rgb(255,247,237)" >
            <img src="../img/logo.jpg" alt="Hangout" width="100" height="40"/>
            <el-menu-item><router-link to="/Home">Home</router-link></el-menu-item>
            <el-menu-item><router-link to="/Group">Group</router-link></el-menu-item>
            <el-menu-item><router-link to="/Events">Events</router-link></el-menu-item>
            <el-menu-item><router-link to="/Profile">Profile</router-link></el-menu-item>
            <!-- <el-menu-item><router-link to="" class="login-link" ></router-link></el-menu-item> -->
            <el-menu-item v-if="loginStatus">
                <el-dropdown>
                    <el-avatar>user</el-avatar>
                    <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item><el-button type="primary" @click="goProfile" class="btn-sign" size="medium">Profile</el-button></el-dropdown-item>
                        <el-dropdown-item><el-button type="primary" @click="logout" class="btn-sign" size="medium">Logout</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-menu-item>
            <el-menu-item class="bb" v-else>
                <el-button type="primary" @click="goLogin" class="btn-sign" size="medium">Login</el-button>
                <el-button type="primary" @click="goSignUp" class="btn-sign" size="medium">SignUp</el-button>
            </el-menu-item>
        </el-menu>
    </div>
    <router-view></router-view>
</template>

<script>
    import { checkLoginStatus} from '../main.js'

    export default{
        data() {
            return {
                loginStatus: false,
                background: "",
                biography: "",
                bithday: "",
                gender: "",
                job: "",
                location: "",
            }
        },
        name: "nav1",
        mounted: function() {
            this.checkLoginStatus();
        },
        watch: {
			$route(){
				this.checkLoginStatus();
			}
		},
        methods: {
            checkLoginStatus() {
                checkLoginStatus().then((res) => {
                    this.loginStatus = res.loginStatus;
                })
            },
            logout() {
                this.axios({
                    url: "/api/user/logout",
                    method: "get"
                }).then(response => {
                    if (response.data.status) {
                        console.log(response.data.message)
                    } else {
                        console.log(response.data.message)
                    }
                    this.$router.go(0)
                })
            },
            goSignUp() {
                this.$router.push('/SignUp')
            },
            goLogin() {
                this.$router.push('/Login')
            },
            goProfile() {
                this.$router.push('/Profile')
            }
        }
    }
</script>
<style>
    .nav-box {
        position: relative;
        border: 0px 0px 1px 0px solid;
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