<template>
<meta name="referrer" content="no-referrer">
    <h1>Groups page</h1>
    <el-row>
        <el-form ref="form">
            <el-form-item>
                <el-input placeholder="search group" v-model="email">
                </el-input>
            </el-form-item>
            <el-button icon="el-icon-search" circle></el-button>
            <el-button type="warning" @click="toCreateGroup" round>Create Group</el-button>
        </el-form>
    </el-row>
    <div>
        <article v-for="group in groups" class="gg">
            <p><img :src="group.backgroundImage"/>
            <p>{{group.name }}</p>
            <p>{{group.information}}</p>
            <p>{{group.location}}</p></p>
        </article> 
    </div>
</template>
<script>

    export default{
        data(){
            return{
                newgroup:"",
                groups: []
            }
        },
        mounted: function() {
            this.loadAllGroups();
        },
        name: "Group",
        watch: {
			$route(){
				this.loadAllGroups();
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
            }
        }
    }
</script>
<style>
    .gg{
        float:left;
		width: 45%;
		height: 200px;
		padding: 5px;
		box-shadow: 3px 3px 3px 2px #797979;
		margin: 1em 1em 1em 2.5em;
    }
</style>