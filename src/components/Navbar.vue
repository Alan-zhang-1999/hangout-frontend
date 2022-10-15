<template>
    <div class="nav-box" style="background-color: rgb(234,238,231)">
        <el-menu class="nav-menu" mode="horizontal"
            style="background-color: rgb(255,247,237); text-decoration: none; color: inherit;">
            <div style="padding: 0 50px 0 50px; margin-top: 10px">
                <img src="../img/logo.png" alt="Hangout" width="100" height="40" />
            </div>
            <el-row>
                <el-menu-item>
                    <router-link style="text-decoration: none; color: black;" to="/Home">Home</router-link>
                </el-menu-item>
                <el-menu-item>
                    <router-link style="text-decoration: none; color: black;" to="/Group/-">Group</router-link>
                </el-menu-item>
                <el-menu-item>
                    <router-link style="text-decoration: none; color: black;" to="/Events/-">Events</router-link>
                </el-menu-item>
                <el-menu-item>
                    <el-input v-model="input_text" placeholder="Search" class="input-with-select" style="width: 500px">
                        <template #prepend>
                            <el-select v-model="select" placeholder="select" style="width: 100px">
                                <el-option label="Group" value="Group" />
                                <el-option label="Event" value="Event" />
                            </el-select>
                        </template>
                        <template #append>
                            <el-button @click="search"><el-icon><Search color="#409EFF"/></el-icon></el-button>
                        </template>
                    </el-input>
                </el-menu-item>
            </el-row>
            <div style="position: absolute; right: 0;">
                <el-row v-if="loginStatus">
                <el-menu-item>
                    <el-dropdown>
                        <el-avatar>{{username.slice(0, 3)}}</el-avatar>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <!-- <div>
                                        <a href="/#/Im" style="text-decoration: none; color: black;">Chat</a>
                                    </div> -->
                                    <router-link style="text-decoration: none; color: black;" to="/Im">Chat
                                    </router-link>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <!-- <div>
                                        <a href="/#/Profile" style="text-decoration: none; color: black;">Profile</a>
                                    </div> -->
                                    <router-link style="text-decoration: none; color: black;" to="/Profile">Profile
                                    </router-link>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <!-- <div>
                                        <a href="/#/Home" style="text-decoration: none; color: black;">Logout</a>
                                    </div> -->
                                    <div type="primary" @click="logout" class="btn-sign" size="medium">Logout</div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-menu-item>
            </el-row>
            <el-row type="flex" justify="end" v-else>
                <el-menu-item>
                    <router-link style="text-decoration: none; color: black;" to="/Login">Login</router-link>
                </el-menu-item>
                <el-menu-item>
                    <router-link style="text-decoration: none; color: black;" to="/SignUp">SignUp</router-link>
                </el-menu-item>
            </el-row>
            </div>
            
        </el-menu>
    </div>
    <router-view></router-view>
</template>

<script>
import { checkLoginStatus } from '../util.js'
// import { Search } from '@element-plus/icons-vue'
export default {
    data() {
        return {
            input_text: "",
            select: "Event",
            loginStatus: false,
            background: "",
            biography: "",
            bithday: "",
            gender: "",
            job: "",
            location: "",
            username: "",
        }
    },
    name: "nav1",
    mounted: function () {
        this.checkLoginStatus();
    },
    watch: {
        $route() {
            this.checkLoginStatus();
        }
    },
    methods: {
        checkLoginStatus() {
            checkLoginStatus().then((res) => {
                this.loginStatus = res.loginStatus;
                this.username = res.username;
            })
        },
        search() {
            if(this.select == "Group") {
                this.$router.push("/Group/" + this.input_text)
            } else {
                this.$router.push("/Events/" + this.input_text)
            }
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
        },
        goChat() {
            this.$router.push('/Im')
        }
    }
}
</script>
<style>
.nav-box {
	position: sticky;
	top: 0;
    z-index: 100;
    border: 0px 0px 1px 0px solid;
}

.nav-menu {
    margin: 10px;
    /* padding-top: 10px; */
    padding-left: 20px;
}

.login-link {
    position: relative;
    padding-left: 800px;
}

.bb {
    position: relative;
    padding-top: 10px;
}

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>