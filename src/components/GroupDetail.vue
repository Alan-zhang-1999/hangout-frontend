<template>
    <el-row>
        <el-button type="primary" @click="back">Back</el-button>
        <el-button type="primary" v-if="user.loginStatus && !check" @click="joinGroup">Join</el-button>
        <el-button type="primary" v-if="user.loginStatus && check" @click="leaveGroup">Leave</el-button>
    </el-row>
    <div class="container">
        <p>{{group.id}}</p>
        <p>{{group.name}}</p>
        <p>{{group.location}}</p>
        <p>{{group.information}}</p>
    </div>

    <div v-for="user in users" @click="getUserProfile(user.email)" style="width:100px; height: 50px; border: 1px 1px;">
        <p>{{user.username}}</p>
        <!-- <p>{{user.email}}</p> -->
    </div>
</template>
<script>
    import { checkLoginStatus, getUserId } from '../util.js'

    export default {
        data(){
            return {
                group: {
                    id: "",
                    name: "",
                    location: "",
                    information: "",
                    backgroundImage: "",
                },
                user: {},
                check: false,
                users: []
            }
        },
        mounted: async function(){
            await this.getGroupDetail(this.$route.params.id);
            this.user = await checkLoginStatus();
            await this.getAllGroupUsers(this.$route.params.id);
            if (this.user.loginStatus) {
                this.id = await getUserId(this.user.email);
                await this.checkUserInGroup();
            }
        },
        watch: {
            $route(){
                this.getGroupDetail(this.$route.params.id);
                this.getAllGroupUsers(this.$route.params.id);
            }
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
            getGroupDetail(id) {
                this.axios({
                    url: "/api/group/" + id,
                    method: "get"
                }).then(response => {
                    this.group = response.data;
                    console.log(response.data)
                })
            },
            checkUserInGroup() {
                this.axios({
                    url: "/api/group/check",
                    method: "get",
                    params: {
                        "userId": this.id,
                        "groupId": this.group.id
                    }
                }).then(response => {
                    this.check = response.data;
                    return response.data;
                })

            },
            joinGroup() {
                this.axios({
                    url: "/api/group/join",
                    method: "post",
                    params: {
                        "groupId": this.group.id,
                        "userId": this.id
                    }
                }).then(response => {
                    this.$router.go(0);
                })
            },
            leaveGroup() {
                this.axios({
                    url: "/api/group/leave",
                    method: "delete",
                    params: {
                        "groupId": this.group.id,
                        "userId": this.id
                        
                    }
                }).then(response => {
                    this.$router.go(0);
                })
            },
            getAllGroupUsers(id) {
                console.log(id)
                this.axios({
                    url: "/api/group/users",
                    method: "get",
                    params: {
                        "groupId": id
                    }
                }).then(response => {
                    this.users = response.data;
                })
            },
            getUserProfile(email) {
                this.axios({
                    url: "/api/userProfile/" + email,
                    method: "get",
                }).then(response => {
                    console.log(response.data);
                })
            }
        },
    }

</script>