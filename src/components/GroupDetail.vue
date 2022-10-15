<template>
    <div class="page">
        <el-button type="primary" @click="back" style="float:left">Back</el-button>
        <div class="main-ncard">

            <div class="main-img-tamplate">
                <img :src="group.backgroundImage" />
                <!-- <el-image class="main-img" :src="group.backgroundImage" /> -->
            </div>
            <div class="info">
                <p>{{group.id}}</p>
                <p>{{group.name}}</p>
                <p>{{group.location}}</p>
                <p>{{group.information}}</p>
            </div>


            <el-row class="button-row">

                <el-button type="primary" v-if="user.loginStatus && !check" @click="joinGroup">Join</el-button>
                <el-button type="primary" v-if="user.loginStatus && check" @click="leaveGroup">Leave</el-button>
            </el-row>
        </div>
        <h1 class="item-row"># Events</h1>

        <el-row class="item-row" v-for="event in events">
            <n-card :title="event.name" class="item-ncard">
                <template #cover>
                    <img :src="group.backgroundImage">
                </template>
                {{event.time}}
            </n-card>
        </el-row>
        <h1 class="item-row"># Users</h1>
        <div class="users">
            <div class="user" v-for="user in users">
                <div class="icon">
                    <!--<n-avatar round
              :size="30"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />-->
                    <el-avatar @click.native="goProfile(user.id)">{{user.username.slice(0, 3)}}</el-avatar>
                </div>
                <div class="name">{{user.email}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { checkLoginStatus, getUserId } from '../util.js'
import { ref } from 'vue'

const currentDate = ref(new Date())
export default {
    data() {
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
            users: [],
            events: []
        }
    },
    mounted: async function () {
        await this.getGroupDetail(this.$route.params.id);
        this.user = await checkLoginStatus();
        await this.getAllGroupUsers(this.$route.params.id);
        if (this.user.loginStatus) {
            this.id = await getUserId(this.user.email);
            await this.checkUserInGroup();
        }
        this.getEventsOfGroup()
    },
    watch: {
        $route() {
            this.getGroupDetail(this.$route.params.id);
            this.getAllGroupUsers(this.$route.params.id);
            this.getEventsOfGroup()
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
        goProfile(id) {
            this.$router.push("/Profile/"+id)
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
                console.log(this.users)
            })
        },
        getUserProfile(email) {
            this.axios({
                url: "/api/userProfile/" + email,
                method: "get",
            }).then(response => {
                console.log(response.data);
            })
        },
        getEventsOfGroup() {
            this.axios({
                url: "/api/group/getGroupEvent/" + this.$route.params.id,
                method: "get",
            }).then(response => {
                console.log(response.data);
                this.events = response.data;
            })
        }
    },
}

</script>
<style>
.page {
    background-color: rgb(255, 247, 237);
}

.main-ncard {
    max-width: 60%;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
}

.item-ncard {
    max-width: 200px;
    margin: 5px;
    background-color: rgb(234, 238, 231);
}

.item-row {
    margin-left: 20%;
    margin-right: 20%;

}

.button-row {
    margin-top: 20px;
    margin: auto;

}


.main-img-tamplate {
    width: 300px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(234, 238, 231);
}



.main-img-tamplate img {
    width: 100%;
    height: auto;
}

.users {
    margin-left: 20%;
    margin-right: 20%;
    background-color: antiquewhite;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    height: auto;
}

.user {
    display: flex;
    height: 30px;
    background-color: rgb(234, 238, 231);
    width: auto;
    margin: 5px 10px 5px 10px;
}

.name {
    padding-left: 10px;
    font-size: 20px;
}
</style>
  