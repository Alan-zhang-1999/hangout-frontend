<template>
    <div class="page" style="background-color: rgb(255,247,237)">
        <meta name="referrer" content="no-referrer">
        <!-- <el-row>
            <el-form ref="form">
                <el-form-item>
                    <el-input placeholder="search group" v-model="email">
                    </el-input>
                </el-form-item>
                <el-button icon="el-icon-search" circle></el-button>
                <el-button type="warning" @click="toCreateGroup" round>Create Group</el-button>
            </el-form>
        </el-row> -->
        <el-row>
            <el-form ref="form">
                <el-form-item>
                    <el-input placeholder="search group" v-model="keyword">
                    </el-input>
                </el-form-item>  
                
            </el-form>
            <el-button type="primary" @click="searchGroup(keyword)">Search&nbsp;
                <el-icon :size="size" :color="color">
                    <search />
                </el-icon></el-button>
            <el-button type="primary" @click="toCreateGroup">Create Group</el-button>
            
        </el-row>
        <div>
            <article v-for="group in groups" class="gg">
                <p><img :src="group.backgroundImage" />
                <p>{{group.name }}</p>
                <p>{{group.information}}</p>
                <p>{{group.location}}</p></p>
            </article>
        </div>
        <div class="show" v-if="groups.length != 0">
            <div v-for="group in groups" class="event-container" @click="getEventDetail(event.id)">
                <p><img :src="group.backgroundImage" />
                <p>{{group.name }}</p>
                <p>{{group.information}}</p>
                <p>{{group.location}}</p></p>
            </div>
        </div>
        <div class="show" v-if="guessYouLike.length != 0">
            <h2>Guess You Like</h2>
            <div v-for="group in guessYouLike" class="event-container" @click="getEventDetail(event.id)">
                <p><img :src="group.backgroundImage" />
                <p>{{group.name }}</p>
                <p>{{group.information}}</p>
                <p>{{group.location}}</p></p>
            </div>
        </div>
    </div>
</template>
<script>

    export default{
        data(){
            return{
                newgroup: "",
                keyword: "",
                groups: [],
                guessYouLike: [],
            }
        },
        mounted: function() {
            this.loadAllGroups();
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
        methods:{
            loadAllGroups() {
                this.axios({
                    url: "/api/showGroups",
                    method: "get"
                }).then(response => {
                    this.groups = response.data;
                    console.log(response.data)
                })
            },
            toCreateGroup() {
                this.$router.push('/createGroup')
            },
            searchGroup(keyword) {
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
            },
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
        background-color: rgb(255,247,237)
    }
</style>