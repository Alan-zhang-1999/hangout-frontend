<template>
    <div class="container">
        <el-row>
            <el-form ref="form">
                <el-form-item>
                    <el-input clearable placeholder="search group" v-model="keyword">
                    </el-input>
                </el-form-item>

            </el-form>
            <el-button type="primary" @click="searchGroup(keyword)">Search&nbsp;
                <el-icon :size="size" :color="color">
                    <search />
                </el-icon>
            </el-button>
            <el-button type="primary" v-if="user.loginStatus" @click="toCreateGroup">Create Group</el-button>

        </el-row>
        <div v-if="groups.length != 0">
            <div v-for="group in groups" class="events-container" @click="getGroupDetail(group.id)">
                <!-- <p><img :src="group.backgroundImage" /> -->
                <div class="events-img">
                    <img :src="group.backgroundImage"/>
                </div>
                <div class="infor">
                <p>{{group.name }}</p>
                <p>{{group.information}}</p>
                <p>{{group.location}}</p>
            </div>
            </div>
        </div>
        <h2 v-else>There are no groups you want.</h2>
        <div v-if="guessYouLike.length != 0">
            <h2>Guess You Like</h2>
            <div v-for="group in guessYouLike" class="events-container" @click="getGroupDetail(group.id)">
                <!-- <p><img :src="group.backgroundImage" /> -->
                    <div class="events-img">
                    <img :src="group.backgroundImage"/>
                </div>
                <div class="infor">
                <p>{{group.name }}</p>
                <p>{{group.information}}</p>
                <p>{{group.location}}</p>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import { checkLoginStatus } from '../util.js'

export default {
    data() {
        return {
            newgroup: "",
            keyword: "",
            groups: [],
            guessYouLike: [],
            user: {}
        }
    },
    mounted: async function () {
        this.user = await checkLoginStatus();
        if (this.$route.params.input_text!='-'){
                    this.searchGroup(this.$route.params.input_text);
                } else {
                    this.loadAllGroups();
                }
    },
    name: "Group",
    watch: {
        $route() {
                if (this.$route.params.input_text!='-'){
                    this.searchGroup(this.$route.params.input_text);
                } else {
                    this.loadAllGroups();
                }
            }
    },
    methods: {
        loadAllGroups() {
            this.axios({
                url: "/api/showGroups",
                method: "get"
            }).then(response => {
                this.groups = response.data;
                // console.log(response.data)
            })
            this.guessYouLike = [];
        },
        toCreateGroup() {
            this.$router.push('/CreateGroup')
        },
        searchGroup(keyword) {
            if (keyword != "") {
                this.axios({
                    url: "/api/group/search",
                    method: "get",
                    params: {
                        "keyword": keyword
                    }
                }).then(response => {
                    this.groups = response.data.related
                    this.guessYouLike = response.data.guessYouLike
                    console.log("search", keyword)
                })
                this.keyword = "";
            }
        },
        getGroupDetail(id) {
            console.log(id)
            this.$router.push('/GroupDetail/' + id)
        }
    }
}
</script>
<style>
    .gg {
        float: left;
        width: 45%;
        height: 200px;
        padding: 5px;
        margin: 1em 1em 1em 2.5em;
        box-shadow: 3px 3px 3px 2px #797979;
    }

    .group-container {

        float: left;
        width: 400px;
        height: 200px;
        margin: 10px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 4px 8px;
        border-radius: 10px;
        display: block;
        /* background-color: white; */
    }
</style>